import * as reminder from 'src/lib/graphql/reminder/client';
import graphqlClient from 'src/lib/utils/graphqlClient';

const client = {
  setReminder: reminder.setReminder,
};

export default graphqlClient(
  client,
  'http://localhost:5000/inbox-981dc/us-central1/graphql/graphql'
);
