import faunadb from 'faunadb';

const q = faunadb.query;

class FaunaDBQueryManager {
  constructor({secret}) {
    this.client = new faunadb.Client({
      secret: secret || process.env.NEXT_PUBLIC_FAUNADB_SECRET,
      domain: 'db.fauna.com',
      // NOTE: Use the correct domain for your database's Region Group.
      port: 443,
      scheme: 'https',
    });
  }
}

export {q, FaunaDBQueryManager};
