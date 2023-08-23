import { config } from "dotenv";
config()

// POSTGRES_URI=your_postgres_uri
// APP_SECRET=your secret
// PORT=your port
// ACCESS_TOKEN_PRIVATE_KEY=your access token
// REFRESH_TOKEN_PRIVATE_KEY=your refresh token
// NODE_ENV=development
// SESSION_SECRET=your session secret

export const { POSTGRES_URI,
  REDIS_URI,
  APP_SECRET,
  PORT,
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  NODE_ENV,
  SESSION_SECRET } = process.env