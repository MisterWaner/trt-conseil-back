import { Router } from "express";
import { ApplicationController } from "../controllers/application-ctrls.js";

const applicationRouter: Router = Router();
const applicationController = new ApplicationController();

applicationRouter.get("/", applicationController.getAllApplications);
applicationRouter.get("/:id", applicationController.getOneApplication);
applicationRouter.get("/offer/:id", applicationController.getAllApplicationsByOffer);
applicationRouter.post("/", applicationController.postApplication);
applicationRouter.delete("/:id", applicationController.deleteApplication);

export default applicationRouter;
