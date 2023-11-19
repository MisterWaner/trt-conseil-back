import { Router } from "express";
import { ResumeController } from "../controllers/resume-ctrls.js";
import uploadResume from "../middlewares/multerPDF.js";

const resumeRouter: Router = Router();
const resumeController = new ResumeController();

resumeRouter.get("/", resumeController.getAllResumes);
resumeRouter.get("/:id", resumeController.getOneResume);
resumeRouter.post("/", uploadResume.single('resume'), resumeController.postResume);
resumeRouter.put("/:id", uploadResume.single('resume'), resumeController.updateResume);
resumeRouter.delete("/:id", resumeController.deleteResume);

export default resumeRouter;