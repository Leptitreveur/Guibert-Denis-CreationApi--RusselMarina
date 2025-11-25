/**
 * Server shutdown utilities
 * 
 * Provides functions to handle graceful server shutdown with proper
 * database disconnection and signal handling.
 */

import { DbDisconnection } from "../db/mongo.js";
import process from "node:process";

/**
 * Handles graceful server shutdown with database disconnection
 * 
 * Processes system signals (SIGINT, SIGTERM, SIGUSR2) and ensures
 * proper cleanup by disconnecting from MongoDB before exiting.
 * 
 * @async
 * @function serverShutdown
 * @param {string} signal - System signal received (SIGINT for Ctrl+C, SIGTERM for kill command, SIGUSR2 for nodemon restart)
 * @returns {Promise<void>} Exits the process with code 0 after cleanup
 */
async function serverShutdown(signal) {
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

/**
 * Sets up graceful server shutdown handlers
 * 
 * Registers event listeners for system signals (SIGINT, SIGTERM, SIGUSR2)
 * to enable clean shutdown with database disconnection.
 * SIGINT: triggered by Ctrl+C
 * SIGTERM: triggered by kill command
 * SIGUSR2: triggered by nodemon restart
 * 
 * @function setupShutdown
 * @returns {void} Registers signal handlers, does not return a value
 */
export function setupShutdown() {
  process.on("SIGINT", () => serverShutdown("SIGINT")); // Ctrl+C
  process.on("SIGTERM", () => serverShutdown("SIGTERM")); // kill command
  process.on("SIGUSR2", () => serverShutdown("SIGUSR2")); // nodemon restart

  console.log("Clean shutdown configured.");
}
