import {client, q} from './config';

// https://docs.fauna.com/fauna/current/drivers/javascript#streaming
const watch = ({logger, refId}) => {
  const stream = client.stream.document(q.Ref(q.Collection('gift'), refId));
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
          q.Paginate(q.Documents(q.Collection('gift'))),
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

const addDoc = ({itemInfo}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data, ref} = await client.query(
        q.Create(q.Collection('gift'), {
          data: itemInfo,
        })
      );
      resolve(Object.assign({status: 200, data, refId: ref.id}));
    } catch (error) {
      reject({status: 404, message: error.description});
    }
  });
};

export {addDoc, getDocs, watch};
