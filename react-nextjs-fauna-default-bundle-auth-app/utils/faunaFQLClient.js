import faunadb from 'faunadb';

class FaunaDBManager {
  constructor(token) {
    this.client = new faunadb.Client({
      secret: token || process.env.NEXT_PUBLIC_FAUNA_DB_SERVER_KEY,
      domain: 'db.fauna.com',
      // NOTE: Use the correct domain for your database's Region Group.
      port: 443,
      scheme: 'https',
    });
  }
}

export {FaunaDBManager};
