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

    // Insert some sample data
    await users.insertOne({ name: 'John Doe', age: 30 });

    // Retrieve and snapshot the data
    const insertedUser = await users.findOne({ name: 'John Doe' });
    insertedUser._id = "constant-id";
    expect(insertedUser).toMatchSnapshot();
  });

  it('should retrieve the correct product data', async () => {
    const products = db.collection('products');

    // Insert some sample data
    await products.insertOne({ product: 'Laptop', price: 1200 });

    // Retrieve and snapshot the data
    const insertedProduct = await products.findOne({ product: 'Laptop' });
    insertedProduct._id = "constant-id";
    expect(insertedProduct).toMatchSnapshot();
  });

  it('POS: should update the existing user data correctly', async () => {
    const users = db.collection('users');
  
    // Assume user already inserted from previous test
    // Update the user's age
    await users.updateOne({ name: 'John Doe' }, { $set: { age: 35 } });
  
    // Retrieve the updated data
    const updatedUser = await users.findOne({ name: 'John Doe' });
  
    // Replace the _id to ensure consistent snapshot
    updatedUser._id = "constant-id";
  
    expect(updatedUser).toMatchSnapshot();
  });

  it('should delete the user correctly', async () => {
    const users = db.collection('users');
  
    // Delete the user
    await users.deleteOne({ name: 'John Doe' });
  
    // Try to retrieve the deleted user
    const deletedUser = await users.findOne({ name: 'John Doe' });
  
    expect(deletedUser).toBeNull();
  });
  
  it('POS: should return null for non-existing product', async () => {
    const products = db.collection('products');
  
    // Trying to find a non-existing product
    const nonExistingProduct = await products.findOne({ product: 'Tablet' });
  
    expect(nonExistingProduct).toBeNull();
  });
    
  
});
