import { Router } from "express";
import { chatController } from "./chat.controller.js";

const chatRouter = Router();
console.log("👉 chat router initialized");
chatRouter.post('/chat',chatController );


export default chatRouter;