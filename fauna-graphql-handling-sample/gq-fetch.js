import {GraphQLClient, gql} from 'graphql-request';
import dotenv from 'dotenv';
import {createClient} from '@urql/core';

dotenv.config();

const graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_DB_SERVER_KEY}`,
  },
});

const doQuery = () => {
  const q = gql`
    query FindAllTodos {
      allTodos {
        data {
          _id
          title
          completed
        }
      }
    }
  `;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await graphQLClient.request(q);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

(async () => {
  const result = await doQuery();
  console.log(JSON.stringify(result, null, 2));
})();
