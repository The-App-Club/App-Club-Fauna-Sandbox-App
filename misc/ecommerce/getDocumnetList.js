import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Documents(q.Collection('stores'))),
    //     q.Lambda('storeRef', q.Get(q.Var('storeRef')))
    //   )
    // );
    // console.log(JSON.stringify(response, null, 2));

    response = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('products'))),
        q.Lambda('productRef', q.Get(q.Var('productRef')))
      )
    );
    console.log(JSON.stringify(response, null, 2));

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Documents(q.Collection('customers'))),
    //     q.Lambda('customerRef', q.Get(q.Var('customerRef')))
    //   )
    // );
    // console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
})();
