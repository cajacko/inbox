const { CertStorage } = require('@cajacko/template-utils');
const { join } = require('path');
const { ensureAppKeys } = require('./android');

const { GITHUB_TOKEN } = process.env;
const slug = 'inbox';

const githubRepo = `${slug}-certificates`;

const certStorage = new CertStorage(
  slug,
  `https://${GITHUB_TOKEN}@github.com/cajacko/${githubRepo}.git`,
  null,
  {
    preventDelete: true,
    githubRepo,
    githubUser: 'cajacko',
    githubToken: GITHUB_TOKEN,
  }
);

ensureAppKeys({
  android: true,
  certStorage,
  bundleID: 'com.charliejackson.inbox',
  tmpDir: join(__dirname, '../../packages/app'),
});
