import isEqual from 'src/lib/utils/conditionals/isEqual';
import platformHistory from 'src/packages/history';

const history = platformHistory();

const originalPush = history.push;

/**
 * Custom push function
 */
const push = (preventPush: boolean) => (
  newPathname: string,
  state: { [key: string]: any },
  forceUpdate: boolean
) => {
  if (!forceUpdate) {
    if (
      isEqual(
        newPathname,
        `${history.location.pathname}${history.location.search}`
      ) &&
      isEqual(newPathname, history.location.pathname) &&
      isEqual(state, history.location.state)
    ) {
      return false;
    }
  }

  if (!preventPush) {
    originalPush(newPathname, state);
  }

  return true;
};

const newHistory = Object.assign(history, {
  push: push(false),
  wouldPushUpdate: push(false),
});

export default newHistory;
