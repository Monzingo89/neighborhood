import faunadb from 'faunadb';
const client = new faunadb.Client({
  secret: 'fnAEfOOvWKAAQK2_JBoEboJhE5Bj5DpucowIZWX-',
  domain: 'db.us.fauna.com',
  port: 443,
  scheme: 'https',
})
const q = faunadb.query;
export { client, q };