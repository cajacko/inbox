import { Then } from 'cucumber';
import { ICondition } from '../../utils/ensureCondition';
import home from '../Home/Home.page';
import login from '../Login/Login.page';

Then(
  'the {string} home route {string} visible',
  (type: string, condition: ICondition) => {
    switch (type) {
      case 'logged in':
        return home.visible(condition);
      case 'logged out':
        return login.visible(condition);
      default:
        throw new Error();
    }
  }
);
