import { Router } from "express";
import {
    getAllCandidates,
    approveCandidate,
    deleteCandidate,
    getAllApprovedCandidates,
    getAllUnapprovedCandidates,
    getCandidateById,
    updateCandidate,
} from "../controllers/candidat-ctrls.js";
import { ApplicationController } from "../controllers/application-ctrls.js";

const candidatRouter: Router = Router();
const applicationController = new ApplicationController();

candidatRouter.get("/", getAllCandidates);
candidatRouter.get("/approved", getAllApprovedCandidates);
candidatRouter.get("/unapproved", getAllUnapprovedCandidates);
candidatRouter.get("/:id", getCandidateById);
candidatRouter.put("/:id", updateCandidate);
candidatRouter.delete("/:id", deleteCandidate);
candidatRouter.put("/:id/approve", approveCandidate);
candidatRouter.get("/:id/applications", applicationController.getAllApplicationsByCandidate);

export default candidatRouter;
