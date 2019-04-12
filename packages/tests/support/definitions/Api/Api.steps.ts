import { Given, Then, When } from 'cucumber';
import api from './Api.page';

Then('api data {string} {string}', (conditional, key) =>
  api.data(conditional, key));

Given('we preload the api with {string} reminders', count =>
  api.preloadReminders(parseInt(count, 10)));

When('we revoke the id token', () => api.revokeToken());

Then(
  'the sync request count {string} {string}',
  (string, string2) =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
);

Given('we preload the api with {string} {string} reminders', (count, status) =>
  api.preloadReminders(parseInt(count, 10), status));

Then(/the due date of the only reminder "(.+?)" (.*)/, (conditional, date) =>
  api.checkOnlyDueDate(conditional, date.replace(/"/g, '')));
