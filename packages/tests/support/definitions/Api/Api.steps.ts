import { Given, Then } from 'cucumber';
import api from './Api.page';

Then('api data {string} {string}', (conditional, key) =>
  api.data(conditional, key));

Given('we preload the api with {string} reminders', count =>
  api.preloadReminders(parseInt(count, 10)));
