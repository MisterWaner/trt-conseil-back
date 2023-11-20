import { prisma } from "../lib/prisma.js";
export class ResumeController {
    //Get all resumes
    async getAllResumes(req, res) {
        try {
            const resumes = await prisma.resume.findMany();
            res.json(resumes);
        }
        catch (error) {
            console.error(error);
            res.json({ "Erreur lors de la récupération des CV": error });
        }
    }
    //Get resume by id
    async getOneResume(req, res) {
        try {
            const id = req.params.id;
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la récupération du CV": error,
            });
        }
    }
    //Post resume
    async postResume(req, res) {
        try {
            const { userId } = req.body;
            if (!req.file) {
                return res.status(400).json({
                    message: "Aucun fichier PDF n'a été trouvé, veuillez sélectionner un fichier PDF à télécharger",
                });
            }
            const fileName = req.file.filename;
            // if (!fileName) {
            //     return res.status(500).json({
            //         message:
            //             "Une erreur interne s'est produite lors du traitement du fichier. Veuillez réessayer.",
            //     });
            // }
            const resumeUrl = `https://trt-conseil-back.up.railway.app/upload/resumes/${fileName}`;
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
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors du téléchargement du CV du candidat",
                error,
            });
        }
    }
    //Update resume
    async updateResume(req, res) {
        try {
            const userId = req.body.userId;
            const id = req.params.id;
            if (!req.file) {
                return res.status(400).json({
                    message: "Aucun fichier PDF n'a été trouvé, veuillez sélectionner un fichier PDF à télécharger",
                });
            }
            const fileName = req.file.filename;
            // if (!fileName) {
            //     return res.status(500).json({
            //         message:
            //             "Une erreur interne s'est produite lors du traitement du fichier. Veuillez réessayer.",
            //     });
            // }
            const resumeUrl = `https://trt-conseil-back.up.railway.app/upload/resumes/${fileName}`;
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la mise à jour du CV": error,
            });
        }
    }
    //Delete resume
    async deleteResume(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const resume = await prisma.resume.delete({
                where: {
                    id: id,
                },
            });
            res.status(200).json(resume);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la suppression du CV": error,
            });
        }
    }
}
