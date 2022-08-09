import {client, q} from './config';

(async () => {
  try {
    const responseGetIndexList = await client.query(q.Paginate(q.Indexes()));

    console.log(responseGetIndexList);
  } catch (error) {
    console.log(error);
  }
})();
