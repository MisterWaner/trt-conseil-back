import { Router } from "express";
import {
    AdminController
} from "../controllers/admin-ctrls.js";
import {AuthController} from "../controllers/auth-ctrls.js"

const adminRouter: Router = Router();
const authController = new AuthController();
const adminController = new AdminController();

adminRouter.post("/", authController.createAdmin);
adminRouter.get("/", adminController.getAllAdmins);
adminRouter.get("/:id", adminController.getAdminById);
adminRouter.put("/:id", adminController.updateAdmin);
adminRouter.delete("/:id", adminController.deleteAdmin);

export default adminRouter;
