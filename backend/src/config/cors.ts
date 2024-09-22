import dotenv from 'dotenv';

dotenv.config();

export const corsOptions = {
  origin: `${process.env.FRONTEND_SERVER_URL}:${process.env.F_PORT}`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessfulStatus: 200
}