import { Router } from "express";
import { login, logout, register } from "../controllers/auth-ctrls.js";
const authRouter = Router();
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/register", register);
export default authRouter;
