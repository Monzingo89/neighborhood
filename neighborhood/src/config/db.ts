import faunadb from 'faunadb';
const client = new faunadb.Client({
  secret: '',
  domain: 'db.us.fauna.com',
  port: 443,
  scheme: 'https',
})
const q = faunadb.query;
export { client, q };