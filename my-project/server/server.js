

import http from 'http';
import app from './app.js';
import { config } from './src/config/index.js';
import { connectDB } from './src/config/connectDB.js';



   

const server = http.createServer(app);


  await connectDB();

  server.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port} in ${config.nodeEnv} mode`);
  });
