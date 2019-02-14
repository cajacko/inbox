import * as sync from 'src/lib/graphql/sync/client';
import graphqlClient from 'src/lib/utils/graphqlClient';

const client = {
  sync: sync.sync,
};

export default graphqlClient(
  client,
  'http://localhost:5000/inbox-981dc/us-central1/graphql/graphql'
);
