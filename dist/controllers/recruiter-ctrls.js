import { prisma } from "../lib/prisma.js";
export class RecruiterController {
    //Get all recruiters
    async getAllRecruiters(req, res) {
        try {
            const recuiters = await prisma.user.findMany({
                where: {
                    roleId: 3,
                },
            });
            if (!recuiters)
                return res
                    .status(404)
                    .json({ message: "Aucun recruteur trouvé" });
            return res.status(200).json(recuiters);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération des recruteurs",
                error,
            });
        }
    }
    //Get recruiter by id
    async getRecruiterById(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const recruiter = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!recruiter)
                return res
                    .status(404)
                    .json({ message: "Recruteur introuvable" });
            return res.status(200).json(recruiter);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération du recruteur",
                error,
            });
        }
    }
    //Update recruiter
    async updateRecruiter(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const { firstname, lastname, societyName, email, address, } = req.body;
            if (!societyName || !address)
                return res.status(400).json({
                    message: "L'adresse et le nom de l'entreprise sont obligatoires",
                });
            const recruiter = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!recruiter)
                return res
                    .status(404)
                    .json({ message: "Recruteur introuvable" });
            const updatedRecruiter = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    societyName: societyName,
                    email: email,
                    address: address,
                },
            });
            return res
                .status(200)
                .json({ message: "Recruteur modifié", updatedRecruiter });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la modification du consultant",
                error,
            });
        }
    }
    //Delete recruiter
    async deleteRecruiter(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });
            const recruiter = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!recruiter)
                return res
                    .status(404)
                    .json({ message: "Recruteur introuvable" });
            await prisma.user.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({ message: "Recruteur supprimé" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la suppression du recruteur",
                error,
            });
        }
    }
}
