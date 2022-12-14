import {client, q} from './config';

const deleteAllCollections = async () => {
  return await client.query(
    q.Map(q.Paginate(q.Collections()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  );
};

const deleteAllFunctions = async () => {
  return await client.query(
    q.Map(q.Paginate(q.Functions()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  );
};

const deleteAllIndexes = async () => {
  return await client.query(
    q.Map(q.Paginate(q.Indexes()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  );
};

const deleteAllRoles = async () => {
  return await client.query(
    q.Map(q.Paginate(q.Roles()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  );
};

(async () => {
  await deleteAllCollections();
  await deleteAllFunctions();
  await deleteAllIndexes();
  await deleteAllRoles();
})();
