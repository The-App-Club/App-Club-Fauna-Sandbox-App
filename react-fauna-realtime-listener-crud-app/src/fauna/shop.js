import {client, q} from './config';
// Bonus
// https://docs.fauna.com/fauna/current/api/fql/functions/paginate?lang=javascript
const niceDelete = async (response) => {
  if (response.data) {
    await client.query(
      q.Map(response.data, q.Lambda('X', q.Delete(q.Var('X'))))
    );
  }
};

const paginateDelete = async (response, collectionName) => {
  if (!response.after) {
    await niceDelete(response); // do remain delete. this is teardown.
    return;
  }
  await niceDelete(response); // do current delete
  response = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection(collectionName)), {
        after: response.after,
      }),
      q.Lambda('X', q.Var('X'))
    )
  );
  return paginateDelete(response);
};

// https://docs.fauna.com/fauna/current/drivers/javascript#streaming
const watch = ({logger, refId}) => {
  client.stream.document();
  const stream = client.stream.document(q.Ref(q.Collection('shop'), refId));
  stream
    .on('snapshot', (snapshot) => {
      const {data} = snapshot;
      logger(data);
    })
    .on('version', (version) => {
      const {document} = version;
      const {data} = document;
      logger(data);
    })
    .on('error', (error) => {
      logger(error);
      stream.close();
    })
    .start();
  return stream;
};

const getDocs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('shop'))),
          q.Lambda('item', q.Get(q.Var('item')))
        )
      );
      const itemList = data
        .map(({data, ref, ts}, index) => {
          return {...data, refId: ref.id, ts};
        })
        .sort((a, b) => {
          return b.ts - a.ts;
        });
      resolve(Object.assign({status: 200, result: itemList}));
    } catch (error) {
      reject({status: 404, message: error.description});
    }
  });
};

const updateDoc = ({refId, updateInfo}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data, ref} = await client.query(
        q.Update(q.Ref(q.Collection('shop'), refId), {
          data: updateInfo,
        })
      );
      resolve(Object.assign({status: 200, ...data, refId: ref.id}));
    } catch (error) {
      reject({status: 404, message: error.description});
    }
  });
};

const removeDoc = ({refId}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data, ref} = await client.query(
        q.Delete(q.Ref(q.Collection('shop'), refId))
      );
      resolve(Object.assign({status: 200, ...data, refId: ref.id}));
    } catch (error) {
      reject({status: 404, message: error.description});
    }
  });
};

const removeDocs = ({collectionName}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection(collectionName))),
          q.Lambda('X', q.Var('X'))
        )
      );
      await paginateDelete(response, collectionName);
      resolve(Object.assign({status: 200}));
    } catch (error) {
      reject({status: 404, message: error.description});
    }
  });
};

const addDoc = ({itemInfo}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data, ref} = await client.query(
        q.Create(q.Collection('shop'), {
          data: itemInfo,
        })
      );
      resolve(Object.assign({status: 200, ...data, refId: ref.id}));
    } catch (error) {
      reject({status: 404, message: error.description});
    }
  });
};

export {addDoc, getDocs, updateDoc, removeDoc, removeDocs, watch};
