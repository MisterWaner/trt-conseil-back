import { Router } from "express";
import { UserController} from "../controllers/user-ctrls.js";
import { PasswordController } from "../controllers/pswd-ctrls.js";

const userRouter: Router = Router();
const passwordController = new PasswordController();
const userController = new UserController();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getOneUser);
userRouter.put("/:id/reset-password", passwordController.updatePassword);

export default userRouter;