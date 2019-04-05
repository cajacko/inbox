import * as sync from 'src/lib/graphql/sync/client';
import AppError from 'src/lib/modules/AppError';
import graphqlClient from 'src/lib/utils/graphqlClient';
import getEnvVar from 'src/utils/getEnvVar';

const client = {
  sync: sync.sync,
};

const endpoint = getEnvVar('API_ENDPOINT');

if (!endpoint) throw new AppError('No env value for API_ENDPOINT', '100-023');

export default graphqlClient(client, endpoint || '');
