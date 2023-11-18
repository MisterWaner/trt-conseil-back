import { Router } from "express";
import {
    RoleController
} from "../controllers/role-ctrls.js";

const roleRouter: Router = Router();
const roleController = new RoleController();

roleRouter.get("/", roleController.getAllRoles);
roleRouter.get("/:id", roleController.getOneRole);
roleRouter.post("/", roleController.createRole);
roleRouter.put("/:id", roleController.updateRole);
roleRouter.delete("/:id", roleController.deleteRole);

export default roleRouter;
