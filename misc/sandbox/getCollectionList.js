import {client, q} from './config';

(async () => {
  try {
    const repsonseGetCollectionList = await client.query(
      q.Paginate(q.Collections())
    );

    console.log(repsonseGetCollectionList);
  } catch (error) {
    console.log(error);
  }
})();
