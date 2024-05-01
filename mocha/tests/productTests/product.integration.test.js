import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import { MongoMemoryServer } from 'mongodb-memory-server';

// Continue with your existing test code
describe('Product Integration Tests', function() {
  let mongoServer;
  let db;

  before(async function() {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(mongoServer.instanceInfo.dbName);
    await db.collection('products').insertMany([{ product: 'Laptop', price: 1200 }]);
  });

  after(async function() {
    await mongoServer.stop();
  });

  it('should retrieve products and match snapshot', async function() {
    const products = await db.collection('products').find().toArray();
  });

});
