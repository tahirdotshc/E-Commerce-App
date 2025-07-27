
import routes from './src/routes/index.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import product from './src/routes/productRoute.js'
import userRouter from './src/routes/user.route.js';
import categoryRouter from './src/routes/category.route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan());
app.use(helmet(
    {
        crossOriginResourcePolicy : false
    }));

app.use("/api/v1/",product);

app.use("/api/user/", userRouter);
app.use("/api/category", categoryRouter)



    
// Middlewares



// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;