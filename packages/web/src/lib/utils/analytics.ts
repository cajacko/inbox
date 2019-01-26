import Analytics from 'src/lib/modules/Analytics';
import Auth from 'src/lib/modules/Auth';
import history from 'src/lib/utils/history';

const analytics = new Analytics();

analytics.init();

history.listen((location) => {
  analytics.trackScene(location.pathname);
});

Auth.getUser().then((user) => {
  if (!user) return;

  analytics.setUserIfNotSet({ userId: user.id });
});

export default analytics;
