import dotenv from 'dotenv';
import mysql, { Pool, PoolOptions } from 'mysql2';
dotenv.config();

export const database: Pool = mysql.createPool({
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT!), 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

