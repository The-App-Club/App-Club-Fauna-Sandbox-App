import {client, q} from './config';
const {CreateCollection, Collection, Do, Exists, Not} = {...q};

function CreateCollectionIfNotExists({name, ttl_days}) {
  return q.If(
    Not(Exists(Collection(name))),
    CreateCollection({
      name,
      ttl_days,
    }),
    `Already exsist, skip create collection.`
  );
}

(async () => {
  try {
    let response;
    response = await client.query(
      Do(CreateCollectionIfNotExists({name: 'shop'}))
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
