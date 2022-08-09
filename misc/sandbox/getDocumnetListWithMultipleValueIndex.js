import {client, q} from './config';

(async () => {
  try {
    let response;

    // response = await client.query(
    //   q.Paginate(q.Match(q.Index('all_people_all_fields')))
    // );

    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_people_all_fields'))),
    //     q.Lambda(['W', 'X', 'Y', 'Z', 'ref'], q.Get(q.Var('ref')))
    //   )
    // );

    // console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('letters_sort_by_extra_asc'))),
        q.Lambda(['extra', 'ref'], q.Var('extra'))
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
