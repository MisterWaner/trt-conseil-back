import { Router } from "express";
import {
    approveOffer,
    deleteOffer,
    getAllApprovedOffers,
    getAllOffers,
    getAllUnapprovedOffers,
    getOneOffer,
    postOffer,
} from "../controllers/offer-ctrls.js";
import { getAllApplicationsByOffer } from "../controllers/application-ctrls.js";

const offerRouter: Router = Router();

offerRouter.get("/", getAllOffers);
offerRouter.get("/approved", getAllApprovedOffers);
offerRouter.get("/unapproved", getAllUnapprovedOffers);
offerRouter.get("/:id", getOneOffer);
offerRouter.post("/", postOffer);
offerRouter.delete("/:id", deleteOffer);
offerRouter.put("/:id/approve", approveOffer);
offerRouter.get("/:id/applications", getAllApplicationsByOffer);

export default offerRouter;