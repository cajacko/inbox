import * as reminder from 'src/lib/graphql/reminder/client';
import * as sync from 'src/lib/graphql/sync/client';
import graphqlClient from 'src/lib/utils/graphqlClient';

const client = {
  deleteReminder: reminder.deleteReminder,
  setReminder: reminder.setReminder,
  sync: sync.sync,
};

export default graphqlClient(
  client,
  'http://localhost:5000/inbox-981dc/us-central1/graphql/graphql'
);
