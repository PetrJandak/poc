import { expect } from 'chai';
import { describe, it } from 'mocha';
import chai from 'chai';

import chaiJestSnapshot from 'chai-jest-snapshot';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import { MongoMemoryServer } from 'mongodb-memory-server';

chai.use(chaiJestSnapshot);
function setupSnapshot(filename) {
    chaiJestSnapshot.setFilename(filename);
  }
describe('User Integration Tests', function() {
  let mongoServer;
  let db;

  before(async function() {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(mongoServer.instanceInfo.dbName);
    await db.collection('users').insertMany([{ name: 'John Doe' }, { name: 'Jane Doe' }]);
  });

  after(async function() {
    await mongoServer.stop();
  });

  beforeEach(function () {
    setupSnapshot('./tests/snapshots/user.integration.test.js');
    chaiJestSnapshot.setTestName(this.currentTest.title);
  });

  it('should retrieve users and match snapshot', async function() {
    const users = await db.collection('users').find().toArray();
    expect(users).to.matchSnapshot('users');
  });

});
