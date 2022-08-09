import 'isomorphic-fetch';
import {createClient} from '@urql/core';
import {readFileSync} from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: () => {
    return {
      headers: {
        authorization: `Bearer ${process.env.FAUNA_DB_SERVER_KEY}`,
      },
    };
  },
});

const loadQuery = ({loadQueryFilePath}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await readFileSync(`${loadQueryFilePath}`, 'utf-8');
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const doQuery = ({q}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await client.query(q).toPromise();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

(async () => {
  const loadedQuery = await loadQuery({loadQueryFilePath: `./select.gql`});
  const result = await doQuery({q: loadedQuery});
  console.log(JSON.stringify(result, null, 2));
})();
