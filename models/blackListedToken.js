import mongoose from 'mongoose';

/**
 * BlackListedToken schema
 *
 * Represents the blacklisted JWT token in the system after user disconnects from the API.
 * Documents are automatically deleted after 24 hours (86400 seconds) using mongoDB TTL (Time To Live) index.
 *
 * @typedef {Object} blackListedTokenSchema
 * @property {string} token - Unique token (required)
 * @property {Date} createdAt - Document creation timestamp (auto-generated, used for TTL expiration - 24 hours)
 */
const blackListedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

/**
 * BlackListedToken model
 *
 * Mongoose model for BlackListedToken documents
 *
 * @typedef {import('mongoose').Model<blackListedTokenSchema & import('mongoose').Document>} blackListedTokenModel
 */
const BlackListedToken = mongoose.model('BlackListedToken', blackListedTokenSchema);

export default BlackListedToken;
