import { Router } from "express";
import {
    createRole,
    deleteRole,
    getAllRoles,
    getOneRole,
    updateRole,
} from "../controllers/role-ctrls.js";

const roleRouter: Router = Router();

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", getOneRole);
roleRouter.post("/", createRole);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

export default roleRouter;
