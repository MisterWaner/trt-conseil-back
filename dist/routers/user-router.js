import { Router } from "express";
import { getAllUsers, getOneUser } from "../controllers/user-ctrls.js";
import { updatePassword } from "../controllers/pswd-ctrls.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUser);
userRouter.put("/:id/reset-password", updatePassword);
export default userRouter;
