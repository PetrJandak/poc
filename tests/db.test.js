const { MongoClient } = require('mongodb');

describe('POS: MongoDB Snapshot Testing', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should retrieve the correct user data', async () => {
    const users = db.collection('users');

    await users.insertOne({ name: 'John Doe', age: 30 });

    const insertedUser = await users.findOne({ name: 'John Doe' });
    insertedUser._id = "constant-id";
    expect(insertedUser).toMatchSnapshot();
  });

  it('should retrieve the correct product data', async () => {
    const products = db.collection('products');

    await products.insertOne({ product: 'Laptop', price: 1200 });

    const insertedProduct = await products.findOne({ product: 'Laptop' });
    insertedProduct._id = "constant-id";
    expect(insertedProduct).toMatchSnapshot();
  });

  it('POS: should update the existing user data correctly', async () => {
    const users = db.collection('users');
  
    await users.updateOne({ name: 'John Doe' }, { $set: { age: 35 } });
  
    const updatedUser = await users.findOne({ name: 'John Doe' });
  
       updatedUser._id = "constant-id";
  
    expect(updatedUser).toMatchSnapshot();
  });

  it('should delete the user correctly', async () => {
    const users = db.collection('users');
  
    await users.deleteOne({ name: 'John Doe' });
  
    const deletedUser = await users.findOne({ name: 'John Doe' });
  
    expect(deletedUser).toBeNull();
  });
  
  it('POS: should return null for non-existing product', async () => {
    const products = db.collection('products');
  
    const nonExistingProduct = await products.findOne({ product: 'Tablet' });
  
    expect(nonExistingProduct).toBeNull();
  });
    
  
});
