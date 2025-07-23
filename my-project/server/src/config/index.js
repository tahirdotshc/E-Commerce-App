import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  email: process.env.EMAIL,
  email_pass: process.env.EMAIL_PASS,
  json_web_token_secret_key : process.env.JSON_WEB_TOKEN_SECRET_KEY,
  secret_key_access_token : process.env.SECRET_KEY_ACCESS_TOKEN,
  secret_key_refresh_token : process.env.SECRET_KEY_REFRESH_TOKEN,
  

  
};

