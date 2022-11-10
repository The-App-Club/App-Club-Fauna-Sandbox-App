import {GraphQLClient} from 'graphql-request';

const endpoint = 'https://graphql.fauna.com/graphql';

const graphQLClient = (token) => {
  const secret = token || process.env.NEXT_PUBLIC_FAUNA_DB_SERVER_KEY;
  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${secret}`,
    },
  });
};

export {graphQLClient};
