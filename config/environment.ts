import * as dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  webBaseUrl: process.env.WEB_BASE_URL || 'https://www.demoblaze.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
  apiUsername: process.env.API_USERNAME || 'admin',
  apiPassword: process.env.API_PASSWORD || 'password123',
};