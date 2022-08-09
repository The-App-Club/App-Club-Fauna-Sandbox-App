import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(q.CreateCollection({name: 'test'}));
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: 'Spaceships'}));
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: 'Pilots'}));
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: 'Posts'}));
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: 'Speeders'}));
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: 'Planets'}));
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: 'Moons'}));
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: "DockTechnicians"}))
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: 'DockRepairs'}));
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: "LaserColors"}))
    // console.log(response);
    // response = await client.query(q.CreateCollection({name: "ShipLogs"}))
    // console.log(response);
    response = await client.query(
      q.CreateCollection({name: 'ShipPositionsHistory'})
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
