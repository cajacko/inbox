import Sentry from 'src/lib/modules/Sentry';
import analytics from 'src/lib/utils/analytics';

const sentry = new Sentry('https://4ef26b2e8524456f9748db983fe22234@sentry.io/1377854');

sentry.init();

analytics.setSentry(sentry);

export default sentry;
