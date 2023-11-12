import { Router } from "express";
import { deleteResume, getAllResumes, getOneResume, postResume, updateResume } from "../controllers/resume-ctrls.js";
import uploadResume from "../middlewares/multerPDF.js";

const resumeRouter: Router = Router();

resumeRouter.get("/", getAllResumes);
resumeRouter.get("/:id", getOneResume);
resumeRouter.post("/", uploadResume.single('file'), postResume);
resumeRouter.put("/:id", uploadResume.single('file'), updateResume);
resumeRouter.delete("/:id", deleteResume);

export default resumeRouter;