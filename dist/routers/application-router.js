import { Router } from "express";
import { deleteApplication, getAllApplications, getAllApplicationsByOffer, getOneApplication, postApplication, } from "../controllers/application-ctrls.js";
const applicationRouter = Router();
applicationRouter.get("/", getAllApplications);
applicationRouter.get("/:id", getOneApplication);
applicationRouter.get("/offer/:id", getAllApplicationsByOffer);
applicationRouter.post("/", postApplication);
applicationRouter.delete("/:id", deleteApplication);
export default applicationRouter;
