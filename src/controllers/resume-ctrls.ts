/************************** RESUME CONTROLLERS ************************/
//Import modules
import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

//Get all resumes
const getAllResumes = async (req: Request, res: Response) => {
    try {
        const resumes = await prisma.resume.findMany();
        res.json(resumes);
    } catch (error) {
        console.error(error);
        res.json({ "Erreur lors de la récupération des CV": error });
    }
};

//Get one resume
const getOneResume = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        if (!id) return res.status(400).json({ message: "Paramètre manquant" });

        const resume = await prisma.resume.findUnique({
            where: {
                id: id,
            },
        });
        if (!resume) return res.status(404).json({ message: "CV introuvable" });

        res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "Erreur lors de la récupération du CV": error });
    }
};

//post resume
const postResume = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const resumeUrl = `http://localhost:3001/uploads/resumes/${req.file?.filename}`;

        if (!id) return res.status(400).json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        const fileName = req.file?.originalname;

        if (!candidate)
            return res.status(404).json({ message: "Candidat introuvable" });

        const resume = await prisma.resume.create({
            data: {
                name: fileName,
                path: resumeUrl,
                userId: id,
            },
        });

        res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "Erreur lors de l'envoie du CV": error });
    }
};

const getResume = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const resumeId: string = req.params.resumeId;

        if (!id || !resumeId)
            return res.status(400).json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!candidate)
            return res.status(404).json({ message: "Candidat introuvable" });

        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
                userId: id,
            },
        });

        if (!resume) return res.status(404).json({ message: "CV introuvable" });

        res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "Erreur lors de la récupération du CV": error });
    }
};

//update resume
const updateResume = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const resumeUrl = `http://localhost:3001/uploads/resumes/${req.file?.filename}`;
        const resumeId: string = req.params.resumeId;

        if (!id || !resumeId)
            return res.status(400).json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        const fileName = req.file?.originalname;

        if (!candidate)
            return res.status(404).json({ message: "Candidat introuvable" });

        const resume = await prisma.resume.update({
            where: {
                userId: id,
            },
            data: {
                id: resumeId,
                name: fileName,
                path: resumeUrl,
            },
        });

        res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "Erreur lors de la mise à jour du CV": error });
    }
};

//delete resume
const deleteResume = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const resumeId: string = req.params.resumeId;

        if (!id || !resumeId)
            return res.status(400).json({ message: "Paramètre manquant" });

        const candidate = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!candidate)
            return res.status(404).json({ message: "Candidat introuvable" });

        const resume = await prisma.resume.delete({
            where: {
                id: resumeId,
                userId: id,
            },
        });

        res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "Erreur lors de la suppression du CV": error });
    }
};

//export controllers
export {
    getAllResumes,
    getOneResume,
    postResume,
    getResume,
    updateResume,
    deleteResume,
};
