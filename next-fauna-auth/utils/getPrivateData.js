import {gql} from 'graphql-request';
import {graphQLClient} from './faunaGraphQLClient';

const query = gql`
  query a($id: ID!) {
    findUserByID(id: $id) {
      email
      todos {
        data {
          _id
          task
          completed
        }
      }
    }
  }
`;

const getPrivateData = ({token}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
      });
      const {email, httpStatus, id} = await response.json();
      if (httpStatus === 200 && id && email) {
        const variables = {
          id,
        };
        const {findUserByID} = await graphQLClient(token).request(
          query,
          variables
        );
        const {data: itemInfoList, email} = {
          ...findUserByID.todos,
          ...findUserByID,
        };
        const resultInfoList = itemInfoList.map((itemInfo) => {
          return Object.assign(itemInfo, {owner: {email}});
        });
        resolve(resultInfoList);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

export {getPrivateData};
