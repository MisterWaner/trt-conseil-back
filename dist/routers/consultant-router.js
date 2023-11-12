import { Router } from "express";
import { deleteConsultant, getAllConsultants, getConsultantById, updateConsultant, } from "../controllers/consultant-ctrls.js";
const consultantRouter = Router();
consultantRouter.get("/", getAllConsultants);
consultantRouter.get("/:id", getConsultantById);
consultantRouter.put("/:id", updateConsultant);
consultantRouter.delete("/:id", deleteConsultant);
export default consultantRouter;
