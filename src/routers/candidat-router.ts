import { Router } from "express";
import {
    CandidatController
} from "../controllers/candidat-ctrls.js";
import { ApplicationController } from "../controllers/application-ctrls.js";

const candidatRouter: Router = Router();
const applicationController = new ApplicationController();
const candidatController = new CandidatController();

candidatRouter.get("/", candidatController.getAllCandidates);
candidatRouter.get("/approved", candidatController.getAllApprovedCandidates);
candidatRouter.get("/unapproved", candidatController.getAllUnapprovedCandidates);
candidatRouter.get("/:id", candidatController.getCandidateById);
candidatRouter.put("/:id", candidatController.updateCandidate);
candidatRouter.delete("/:id", candidatController.deleteCandidate);
candidatRouter.put("/:id/approve", candidatController.approveCandidate);
candidatRouter.get("/:id/applications", applicationController.getAllApplicationsByCandidate);

export default candidatRouter;
