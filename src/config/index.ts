import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  // db_url: process.env.DB_URL || 'https://cloud.mongodb.com/v2/6458e13706ac512c22e61993#/security/database/users'
};
