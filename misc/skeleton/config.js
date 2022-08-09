const faunadb = require('faunadb');

import {config} from 'dotenv';

config();

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET_KEY,
  domain: 'db.fauna.com',
  // NOTE: Use the correct domain for your database's Region Group.
  port: 443,
  scheme: 'https',
});

export {q, client};
