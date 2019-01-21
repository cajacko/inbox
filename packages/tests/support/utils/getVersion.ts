import { version } from '../../../web/package.json';

const getVersion = () => Promise.resolve(version);

export default getVersion;
