import { Router } from "express";
import { AuthController } from "../controllers/auth-ctrls.js";
const authRouter = Router();
const authController = new AuthController();
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/register", authController.register);
export default authRouter;
