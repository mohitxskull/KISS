import { MongoClient } from 'mongodb';

const uri = process.env.URI;

if (!uri || uri === undefined) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (uri.length < 10) {
  throw new Error('Invalid Mongo URI');
}

const client = new MongoClient(uri);
const MongoDB = client.db('kiss');

export default MongoDB;
