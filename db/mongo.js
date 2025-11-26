import mongoose from 'mongoose';

/**
 * MongoDB client connection options configurations
 *
 * @type {object}
 */
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

/**
 * Establishes MongoDB connection
 *
 * @async
 * @function DbConnection
 * @returns {Promise<void>} Promise that resolves when connection is established
 * @throws {Error} Throws error if connection fails
 */
export async function DbConnection() {
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB Connection error : ', err);
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. Successfully connected to MongoDB.');
  } catch (err) {
    console.log('Connection error : ', err);
    throw err;
  }
}

/**
 * Close connection to MongoDB
 *
 * @async
 * @function DbDisconnection
 * @returns {Promise<void>} Promise that resolves when disconnection is complete
 * @throws {Error} Throws error if disconnection fails
 */
export async function DbDisconnection() {
  try {
    await mongoose.disconnect();
    console.log('Successfully disconnected from MongoDB');
  } catch (err) {
    console.error('Failed to disconnect from MongoDB : ', err);
    throw err;
  }
}
