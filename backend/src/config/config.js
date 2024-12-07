import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const CONNECTION_STRING = process.env.CONNECTION_STRING;
export const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

