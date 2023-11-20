/************************** RESUME CONTROLLERS ************************/
//Import modules
import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export class ResumeController {
    async getAllResumes(req: Request, res: Response) {
        try {
            const resumes = await prisma.resume.findMany();
            res.json(resumes);
        } catch (error) {
            console.error(error);
            res.json({ "Erreur lors de la récupération des CV": error });
        }
    }

    async getOneResume(req: Request, res: Response) {
        try {
            const id: string = req.params.id;

            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const resume = await prisma.resume.findUnique({
                where: {
                    id: id,
                },
            });
            if (!resume)
                return res.status(404).json({ message: "CV introuvable" });

            res.status(200).json(resume);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la récupération du CV": error,
            });
        }
    }

    async postResume(req: Request, res: Response) {
        try {
            const { userId } : {userId: string} = req.body;

            if (!req.file) {
                return res.status(400).json({
                    message:
                        "Aucun fichier PDF n'a été trouvé, veuillez sélectionner un fichier PDF à télécharger",
                });
            }

            const fileName = req.file.filename;
            if (!fileName) {
                return res.status(500).json({
                    message:
                        "Une erreur interne s'est produite lors du traitement du fichier. Veuillez réessayer.",
                });
            }
            const resumeUrl = `http://localhost:3001/upload/resumes/${fileName}`;

            if (!userId)
                return res.status(400).json({ message: "Paramètre manquant" });

            const candidate = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!candidate)
                return res
                    .status(404)
                    .json({ message: "Candidat introuvable" });

            const newResume = await prisma.resume.create({
                data: {
                    id: userId,
                    name: fileName,
                    path: resumeUrl,
                    userId: userId,
                },
            });

            return res.status(200).json({
                message: "CV du candidat téléchargé avec succès",
                newResume,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors du téléchargement du CV du candidat",
                error,
            });
        }
    }

    async updateResume(req: Request, res: Response) {
        try {
            const userId: string = req.body.userId;
            const id: string = req.params.id;

            if (!req.file) {
                return res.status(400).json({
                    message:
                        "Aucun fichier PDF n'a été trouvé, veuillez sélectionner un fichier PDF à télécharger",
                });
            }
            const fileName = req.file.filename;
            if (!fileName) {
                return res.status(500).json({
                    message:
                        "Une erreur interne s'est produite lors du traitement du fichier. Veuillez réessayer.",
                });
            }
            const resumeUrl = `http://localhost:3001/uploads/resumes/${fileName}`;

            if (!id || !userId)
                return res.status(400).json({ message: "Paramètre manquant" });

            const candidate = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!candidate)
                return res
                    .status(404)
                    .json({ message: "Candidat introuvable" });

            const resume = await prisma.resume.update({
                where: {
                    userId: userId,
                },
                data: {
                    id: id,
                    name: fileName,
                    path: resumeUrl,
                },
            });

            res.status(200).json(resume);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la mise à jour du CV": error,
            });
        }
    }

    async deleteResume(req: Request, res: Response) {
        try {
            const id: string = req.params.id;

            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const resume = await prisma.resume.delete({
                where: {
                    id: id,
                },
            });

            res.status(200).json(resume);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la suppression du CV": error,
            });
        }
    }
}
