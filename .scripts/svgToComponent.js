const ejs = require('ejs');
const { readdir, readFile, writeFile, ensureFile, remove } = require('fs-extra');
const { join } = require('path');

const template = readFile(join(__dirname, './templates/Component.ts')).then((contents) => ejs.compile(contents.toString()));

const buildFile = (data) => template.then((t) => t(data));

const srcDir = join(__dirname, '../packages/icons');
const outDir = join(__dirname, '../packages/web/src/lib/assets/icons');

const tags = ['path', 'g'];

const replaceTag = (content, tag) => {
  let newContent = content;
  const Tag = tag.charAt(0).toUpperCase() + tag.slice(1);

  newContent = newContent.replace(`<${tag}`, `<${Tag}`);
  newContent = newContent.replace(`</${tag}>`, `</${Tag}>`);

  return newContent;
}

const getIconData = (path, componentName) => {
  return readFile(path).then((contents) => {
    const includesTags = [];
    let content = contents.toString();

    content = content.replace('</svg>', '');

    const viewBox = content.match(/viewBox="([0-9 ]+)"/)[1];

    if (!viewBox) throw new Error(`No view box in "${path}"`);

    content = content.replace(/<svg.+?>/, '');

    tags.forEach((tag) => {
      const newContent = replaceTag(content, tag);

      if (newContent !== content) {
        includesTags.push(tag.charAt(0).toUpperCase() + tag.slice(1));
        content = newContent;
      }
    });

    content = content.trim();

    return {
      imports: includesTags.reduce((acc, tag) => `${acc}, ${tag}`, ''),
      name: componentName,
      viewBox,
      content,
    }
  })
}

const processIcon = ({ path, componentName }) => {
  return getIconData(path, componentName)
    .then((data) => buildFile(data))
    .then((content) => {
      const writePath = join(outDir, `${componentName}.tsx`);

      return ensureFile(writePath)
        .then(() => writeFile(writePath, content));
    })
};

const processIcons = svgPaths => {
  return Promise.all(svgPaths.map(processIcon));
};

const getComponentName = fileName => {
  let componentName = fileName.replace('.svg', '');

  const parts = componentName.split(/[\s-_]+/);

  return parts
    .map(part => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .reduce((acc, part) => {
      return `${acc}${part}`;
    }, '');
};

remove(outDir)
  .then(() => readdir(srcDir))
  .then(contents => processIcons(
    contents
      .filter(fileName => fileName.includes('.svg'))
      .map(fileName => ({
        path: join(srcDir, fileName),
        componentName: getComponentName(fileName),
      }))
  ));
