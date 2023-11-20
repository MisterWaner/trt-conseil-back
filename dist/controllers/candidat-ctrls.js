import { prisma } from "../lib/prisma.js";
export class CandidatController {
    //Get all candidates
    async getAllCandidates(req, res) {
        try {
            const candidates = await prisma.user.findMany({
                where: {
                    roleId: 4,
                },
            });
            if (!candidates)
                return res
                    .status(404)
                    .json({ message: "Aucun candidat trouvé" });
            return res.status(200).json(candidates);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération des candidats",
                error,
            });
        }
    }
    //Get candidate by id
    async getCandidateById(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const candidate = await prisma.user.findUnique({
                where: {
                    id: id,
                    roleId: 4,
                },
            });
            if (!candidate)
                return res
                    .status(404)
                    .json({ message: "Candidat introuvable" });
            return res.status(200).json(candidate);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération du candidat",
                error,
            });
        }
    }
    //Update candidate
    async updateCandidate(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const { firstname, lastname, } = req.body;
            if (!firstname || !lastname)
                return res
                    .status(400)
                    .json({ message: "Le nom et le prénom sont obligatoires" });
            const candidate = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!candidate)
                return res
                    .status(404)
                    .json({ message: "Candidat introuvable" });
            const updatedCandidate = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                },
            });
            res.status(200).json({
                message: "Candidat modifié",
                updatedCandidate,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la modification du candidat",
                error,
            });
        }
    }
    //Delete candidate
    async deleteCandidate(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const candidate = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!candidate)
                return res
                    .status(404)
                    .json({ message: "Candidat introuvable" });
            await prisma.user.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({ message: "Candidat supprimé" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la suppression du candidat",
                error,
            });
        }
    }
    //Approve candidate
    async approveCandidate(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const candidate = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!candidate)
                return res
                    .status(404)
                    .json({ message: "Candidat introuvable" });
            const approvedCandidate = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    isApproved: true,
                },
            });
            return res
                .status(200)
                .json({ message: "Candidat approuvé", approvedCandidate });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de l'approbation du candidat",
                error,
            });
        }
    }
    //Get all approved candidates
    async getAllApprovedCandidates(req, res) {
        try {
            const candidates = await prisma.user.findMany({
                where: {
                    roleId: 4,
                    isApproved: true,
                },
            });
            return res.status(200).json(candidates);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération des candidats",
                error,
            });
        }
    }
    //Get all unapproved candidates
    async getAllUnapprovedCandidates(req, res) {
        try {
            const candidates = await prisma.user.findMany({
                where: {
                    isApproved: false,
                },
            });
            return res.status(200).json(candidates);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération des candidats",
                error,
            });
        }
    }
    //Get candidate resume
    async getCandidateResume(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const resume = await prisma.resume.findUnique({
                where: {
                    userId: id,
                },
            });
            if (!resume)
                return res
                    .status(404)
                    .json({ message: "CV du candidat introuvable" });
            return res.status(200).json(resume);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération du CV du candidat",
                error,
            });
        }
    }
}
