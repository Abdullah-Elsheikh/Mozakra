import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";
import { connectDB } from './db/connection.js';
import userRouter from './src/modules/users/user.router.js';
import courseRouter from './src/modules/course/course.router.js';
import commentRouter from './src/modules/comment/comment.router.js';
import chatRouter from './src/modules/chat/chat.router.js';


dotenv.config({ path: path.resolve('./config/.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Courses API",
      version: "1.0.0",
    },
    servers: [
      { url: process.env.BASE_URL || "http://localhost:3000" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "src/modules/**/*.js")],
});


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



connectDB();

app.use('/api', userRouter);
app.use('/api', courseRouter);
app.use('/api', commentRouter);
app.use('/api',chatRouter)
const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
