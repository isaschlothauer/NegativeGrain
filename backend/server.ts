import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { corsOptions } from './src/config/cors';
import { database } from './src/config/database'
import routes from './src/routes/routes'
import cookieParser from 'cookie-parser'

dotenv.config();

const app: Express = express();

const B_PORT: number = parseInt(process.env.B_PORT || "5001");
app.use(cookieParser());
// app.use( cors(corsOptions) );
app.use( cors() );

app.use(express.json());

// Database connection attempts
database.getConnection((err, connection) => {
  if (err) {
    throw err;
    process.exit(1);
  } else {
    console.log("Database connection established");
    connection.release();
  }
})

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("<h1>Welcome to the backend!</h1><h3>Today we are going to explore something interesting</h3>");
})

app.listen(B_PORT, () => {
  console.log(`Server port ${B_PORT}`);
})

app.use(routes)

