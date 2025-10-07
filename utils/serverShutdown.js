import { DbDisconnection } from "../db/mongo.js";
import process from "node:process";

async function ServerShutdown(signal) {
  console.log(`Signal received: ${signal}. Server shutting down...`);

  try {
    await DbDisconnection();
    console.log("Successfully disconnected from MongoDB.");
    process.exit(0);
  } catch (err) {
    console.error("Warning: MongoDB disconnection failed: ", err.message);
    console.log("Server shutdown completed (MongoDB disconnection failed).");
    process.exit(0);
  }
}

export function SetupShutdown() {
  process.on("SIGINT", () => ServerShutdown("SIGINT")); // Ctrl+C
  process.on("SIGTERM", () => ServerShutdown("SIGTERM")); // kill command
  process.on("SIGUSR2", () => ServerShutdown("SIGUSR2")); // nodemon restart

  console.log("Clean shutdown configured.");
}
