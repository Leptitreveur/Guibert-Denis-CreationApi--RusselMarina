/**
 * Connexion/Disconnection setup to MongoDB
 */

import mongoose from "mongoose";

const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

export async function DbConnection() {
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB Connexion error : ", err);
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB.");
  } catch (err) {
    console.log("Connexion error : ", err);
    throw err;
  }
}

export async function DbDisconnection() {
  try {
    await mongoose.disconnect();
    console.log("Successfully disconnected from MongoDB");
  } catch (err) {
    console.error("Failed to disconnect from MongoDB : ", err);
    throw err;
  }
}
