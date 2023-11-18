import { Router } from "express";
import {
    OffersController
} from "../controllers/offer-ctrls.js";
import { ApplicationController } from "../controllers/application-ctrls.js";

const offerRouter: Router = Router();
const offerController = new OffersController();
const applicationController = new ApplicationController();

offerRouter.get("/", offerController.getAllOffers);
offerRouter.get("/approved", offerController.getAllApprovedOffers);
offerRouter.get("/unapproved", offerController.getAllUnapprovedOffers);
offerRouter.get("/:id", offerController.getOneOffer);
offerRouter.post("/", offerController.postOffer);
offerRouter.delete("/:id", offerController.deleteOffer);
offerRouter.put("/:id/approve", offerController.approveOffer);
offerRouter.get("/:id/applications", applicationController.getAllApplicationsByOffer);

export default offerRouter;