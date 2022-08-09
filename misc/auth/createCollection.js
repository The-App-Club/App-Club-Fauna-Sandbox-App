import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(q.CreateCollection({name: 'users'}));
    // console.log(response);

    // response = await client.query(q.CreateCollection({name: 'SpaceUsers'}));
    // console.log(response);

    // response = await client.query(q.CreateCollection({name: 'Spaceships'}));
    // console.log(response);

    // response = await client.query(q.CreateCollection({name: 'Planets'}));
    // console.log(response);

    response = await client.query(q.CreateCollection({name: 'ShipLogs'}));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
