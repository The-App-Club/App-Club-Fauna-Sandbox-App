import {FaunaDBQueryManager, q} from './config';

const deleteAllCollections = async ({client}) => {
  return await client.query(
    q.Map(q.Paginate(q.Collections()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  );
};

const deleteAllFunctions = async ({client}) => {
  return await client.query(
    q.Map(q.Paginate(q.Functions()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  );
};

const deleteAllIndexes = async ({client}) => {
  return await client.query(
    q.Map(q.Paginate(q.Indexes()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  );
};

const deleteAllRoles = async ({client}) => {
  return await client.query(
    q.Map(q.Paginate(q.Roles()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  );
};

const clean = ({client}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteAllCollections({client});
      await deleteAllFunctions({client});
      await deleteAllIndexes({client});
      await deleteAllRoles({client});
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

(async () => {
  let client = new FaunaDBQueryManager({}).client;
  await clean({client});
})();
