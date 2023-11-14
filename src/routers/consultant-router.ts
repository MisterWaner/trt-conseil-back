import { Router } from "express";
import {
    deleteConsultant,
    getAllConsultants,
    getConsultantById,
    updateConsultant,
} from "../controllers/consultant-ctrls.js";
import { createConsultant } from "../controllers/auth-ctrls.js";

const consultantRouter: Router = Router();

consultantRouter.post("/", createConsultant);
consultantRouter.get("/", getAllConsultants);
consultantRouter.get("/:id", getConsultantById);
consultantRouter.put("/:id", updateConsultant);
consultantRouter.delete("/:id", deleteConsultant);

export default consultantRouter;
