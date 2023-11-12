import { Router } from "express";
import { deleteAdmin, getAdminById, getAllAdmins, updateAdmin, } from "../controllers/admin-ctrls.js";
const adminRouter = Router();
adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdminById);
adminRouter.put("/:id", updateAdmin);
adminRouter.delete("/:id", deleteAdmin);
export default adminRouter;
