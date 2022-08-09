import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Call(q.Function('GetSpaceship'), '326091074390984275')
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Documents(q.Collection('Spaceships'))),
    //     q.Lambda(
    //       'shipRef',
    //       q.Call(q.Function('GetSpaceship'), q.Select(['id'], q.Var('shipRef')))
    //     )
    //   )
    // );
    // console.log(response);

    // response = await client.query(q.Call(q.Function('StopIt'), true));
    // console.log(response);

    // response = await client.query(
    //   q.Call(
    //     q.Function("HasEnoughFuelToWarp"),
    //     q.Ref(q.Collection("Spaceships"), "326091074389934675")
    //   )
    // )
    // console.log(response);

    // response = await client.query(
    //   q.Call(
    //     q.Function("OpenWormholeAndWarp"),
    //     q.Ref(q.Collection("Spaceships"), "326091074389934675")
    //   )
    // )
    // console.log(response);

    // response = await client.query(
    //   q.Call(
    //     q.Function("HasEnoughFuelToWarp"),
    //     q.Ref(q.Collection("Spaceships"), "326091074389934675")
    //   )
    // )
    // console.log(response);

    // response = await client.query(
    //   q.Call(
    //     q.Function("WarpToPlanet"),
    //     [
    //       q.Ref(q.Collection("Spaceships"), "326091074389934675"),
    //       q.Ref(q.Collection("Planets"), "326090229055226451"),
    //     ]
    //   )
    // );
    // console.log(response)

    response = await client.query(q.Call(q.Function('RecordPositions')));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
