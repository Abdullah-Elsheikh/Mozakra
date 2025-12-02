import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './db/connection.js';
import userRouter from './src/modules/users/user.router.js';
import courseRouter from './src/modules/course/course.router.js';
import commentRouter from './src/modules/comment/comment.router.js';


// create server
const app = express();
app.use(express.json());
dotenv.config({path : path.resolve('./config/.env')});
const PORT = process.env.PORT || 3000;
//connect db
connectDB()
//parse Routes
app.use('/api',userRouter)
app.use('/api',courseRouter)
app.use('/api',commentRouter)
//listen server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
