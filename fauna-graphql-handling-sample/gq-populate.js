import {GraphQLClient, gql} from 'graphql-request';
import dotenv from 'dotenv';
import {createClient} from '@urql/core';

dotenv.config();

const graphQLClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_DB_SERVER_KEY}`,
  },
});

const doQuery = ({willLoadedData}) => {
  const q = gql`
    mutation CreateATodo($data: TodoInput!) {
      createTodo(data: $data) {
        title
        completed
      }
    }
  `;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await graphQLClient.request(q, willLoadedData);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

(async () => {
  const result = await doQuery({
    willLoadedData: {
      data: {
        title: `ご飯食べる`,
        completed: false,
      },
    },
  });
  console.log(result);
})();
