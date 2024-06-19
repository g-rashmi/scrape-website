require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'your_mongodb_connection_string_here'
};
