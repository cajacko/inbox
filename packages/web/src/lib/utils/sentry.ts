import Sentry from 'src/lib/modules/Sentry';

const sentry = new Sentry('https://4ef26b2e8524456f9748db983fe22234@sentry.io/1377854');

sentry.init();

export default sentry;
