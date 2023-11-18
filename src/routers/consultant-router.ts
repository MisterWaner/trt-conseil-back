import { Router } from "express";
import {
    deleteConsultant,
    getAllConsultants,
    getConsultantById,
    updateConsultant,
} from "../controllers/consultant-ctrls.js";
import { AuthController } from "../controllers/auth-ctrls.js";

const consultantRouter: Router = Router();
const authController = new AuthController();

consultantRouter.post("/", authController.createConsultant);
consultantRouter.get("/", getAllConsultants);
consultantRouter.get("/:id", getConsultantById);
consultantRouter.put("/:id", updateConsultant);
consultantRouter.delete("/:id", deleteConsultant);

export default consultantRouter;
