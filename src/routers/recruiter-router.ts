import { OffersController } from '../controllers/offer-ctrls.js';
import { Router } from "express";
import {
    RecruiterController
} from "../controllers/recruiter-ctrls.js";
import { ApplicationController } from "../controllers/application-ctrls.js";

const recruiterRouter: Router = Router();
const offerController = new OffersController();
const recruiterController = new RecruiterController();
const applicationController = new ApplicationController();

recruiterRouter.get("/", recruiterController.getAllRecruiters);
recruiterRouter.get("/:id", recruiterController.getRecruiterById);
recruiterRouter.put("/:id", recruiterController.updateRecruiter);
recruiterRouter.delete("/:id", recruiterController.deleteRecruiter);
recruiterRouter.get("/:id/offers", offerController.getAllOffersFromOneRecruiter);
recruiterRouter.get("/:id/offers/:offerId", offerController.getOneOfferFromOneRecruiter);
recruiterRouter.get("/:id/applications", applicationController.getAllApplicationsByRecruiter);

export default recruiterRouter;