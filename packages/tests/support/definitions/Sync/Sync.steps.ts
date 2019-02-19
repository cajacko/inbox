import { Then } from 'cucumber';
import getIndex from '../../utils/getIndex';
import sync from './Sync.page';

Then('the {string} sync request will be {string}', (index, key) =>
  sync.request(getIndex(index), key));
