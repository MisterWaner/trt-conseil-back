import { Router } from "express";
import {
    ConsultantController
} from "../controllers/consultant-ctrls.js";
import { AuthController } from "../controllers/auth-ctrls.js";

const consultantRouter: Router = Router();
const authController = new AuthController();
const consultantController = new ConsultantController();

consultantRouter.post("/", authController.createConsultant);
consultantRouter.get("/", consultantController.getAllConsultants);
consultantRouter.get("/:id", consultantController.getConsultantById);
consultantRouter.put("/:id", consultantController.updateConsultant);
consultantRouter.delete("/:id", consultantController.deleteConsultant);

export default consultantRouter;
