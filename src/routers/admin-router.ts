import { Router } from "express";
import {
    deleteAdmin,
    getAdminById,
    getAllAdmins,
    updateAdmin,
} from "../controllers/admin-ctrls.js";
import {AuthController} from "../controllers/auth-ctrls.js"

const adminRouter: Router = Router();
const authController = new AuthController();

adminRouter.post("/", authController.createAdmin);
adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdminById);
adminRouter.put("/:id", updateAdmin);
adminRouter.delete("/:id", deleteAdmin);

export default adminRouter;
