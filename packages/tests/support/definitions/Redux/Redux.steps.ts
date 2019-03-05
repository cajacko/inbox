import { Given } from 'cucumber';
import redux from './Redux.page';

Given('we preload the redux state with {string} reminders', function (count) {
  // @ts-ignore
  const { nonHeadless } = this;

  return redux.preloadReminders(parseInt(count, 10), nonHeadless);
});

Given('we preload the redux state with {string} {string} reminders', function (
  count,
  status
) {
  // @ts-ignore
  const { nonHeadless } = this;

  return redux.preloadReminders(parseInt(count, 10), nonHeadless, status);
});
