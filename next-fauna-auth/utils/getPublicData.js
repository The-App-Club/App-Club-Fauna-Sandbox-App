import {gql} from 'graphql-request';
import {graphQLClient} from './faunaGraphQLClient';

const query = gql`
  query a {
    allTodos {
      data {
        _id
        task
        completed
        owner {
          email
        }
      }
    }
  }
`;

const getPublicData = ({token}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {allTodos} = await graphQLClient(token).request(query);
      const resultInfoList = allTodos.data;
      resolve(resultInfoList);
    } catch (error) {
      reject(error);
    }
  });
};

export {getPublicData};
