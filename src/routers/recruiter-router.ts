import { Router } from "express";
import {
    deleteRecruiter,
    getAllrecuiters,
    getRecruiterById,
    updateRecruiter,
} from "../controllers/recruiter-ctrls.js";
import { getAllOffersFromOneRecruiter, getOneOfferFromOneRecruiter } from "../controllers/offer-ctrls.js";
import { getAllApplicationsByRecruiter } from "../controllers/application-ctrls.js";

const recruiterRouter: Router = Router();

recruiterRouter.get("/", getAllrecuiters);
recruiterRouter.get("/:id", getRecruiterById);
recruiterRouter.put("/:id", updateRecruiter);
recruiterRouter.delete("/:id", deleteRecruiter);
recruiterRouter.get("/:id/offers", getAllOffersFromOneRecruiter);
recruiterRouter.get("/:id/offers/:offerId", getOneOfferFromOneRecruiter);
recruiterRouter.get("/:id/applications", getAllApplicationsByRecruiter);

export default recruiterRouter;