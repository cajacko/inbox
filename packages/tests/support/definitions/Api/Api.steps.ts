import { Then } from 'cucumber';
import api from './Api.page';

Then('api data {string} {string}', (conditional, key) =>
  api.data(conditional, key));
