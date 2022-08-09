import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'fruits_index',
    //     source: q.Collection('test'),
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: "all_Pilots",
    //     source: q.Collection("Pilots")
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Spaceships',
    //     source: q.Collection('Spaceships'),
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'posts_by_title',
    //     source: q.Collection('Posts'),
    //     terms: [{ field: ['data', 'title'] }],
    //   })
    //   );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'posts_by_tags_with_title',
    //     source: q.Collection('Posts'),
    //     terms: [{field: ['data', 'tags']}],
    //     values: [{field: ['data', 'title']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Vehicles',
    //     source: [q.Collection('Spaceships'), q.Collection('Speeders')],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Pilots_sorted_by_name',
    //     source: q.Collection('Pilots'),
    //     values: [{field: ['data', 'name']}, {field: ['ref']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Pilots_sorted_by_name_desc',
    //     source: q.Collection('Pilots'),
    //     values: [{field: ['data', 'name'], reverse: true}, {field: ['ref']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Planets_by_type',
    //     source: q.Collection('Planets'),
    //     terms: [{field: ['data', 'type']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Planets_by_type_sorted_by_name',
    //     source: q.Collection('Planets'),
    //     terms: [{field: ['data', 'type']}],
    //     values: [{field: ['data', 'name']}, {field: ['ref']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Moons_by_planet',
    //     source: [q.Collection('Moons')],
    //     terms: [{field: ['data', 'planetRef']}],
    //   })
    // );
    // console.log(response);

    response = await client.query(
      q.CreateIndex({
        name: 'all_DockRepairs',
        source: [q.Collection('DockRepairs')],
      })
    );

    console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Planets_by_color',
    //     source: q.Collection('Planets'),
    //     terms: [{field: ['data', 'color']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Spaceships_by_color',
    //     source: q.Collection('Spaceships'),
    //     terms: [{field: ['data', 'colors']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Planets',
    //     source: q.Collection('Planets'),
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_letters',
    //     source: q.Collection('Letters'),
    //   })
    // );

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_people',
    //     source: q.Collection('People'),
    //   })
    // );
  } catch (error) {
    console.log(error);
  }
})();
