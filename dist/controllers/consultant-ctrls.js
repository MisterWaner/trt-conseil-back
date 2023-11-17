import { prisma } from "../lib/prisma.js";
//Get all consultants
const getAllConsultants = async (req, res) => {
    try {
        const consultants = await prisma.user.findMany({
            where: {
                roleId: 2,
            },
            orderBy: {
                id: "asc",
            },
        });
        if (!consultants)
            return res.status(404).json({ message: "Aucun consultant trouvé" });
        return res.status(200).json(consultants);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la récupération des consultants",
            error,
        });
    }
};
//Get one consultant
const getConsultantById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Paramètre manquant" });
        const consultant = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!consultant)
            return res.status(404).json({ message: "Consultant introuvable" });
        return res.status(200).json(consultant);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la récupération du consultant",
            error,
        });
    }
};
//update consultant
const updateConsultant = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Paramètre manquant" });
        const { firstName, lastName } = req.body;
        if (!firstName || !lastName)
            return res
                .status(400)
                .json({ message: "Tous les champs sont obligatoires" });
        const consultant = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!consultant)
            return res.status(404).json({ message: "Consultant introuvable" });
        const updatedConsultant = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                firstname: firstName,
                lastname: lastName,
            },
        });
        return res
            .status(200)
            .json({ message: "Consultant modifié", updatedConsultant });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la modification du consultant",
            error,
        });
    }
};
//delete consultant
const deleteConsultant = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Paramètre manquant" });
        const consultant = await prisma.user.findUnique({
            where: {
                id: id,
                roleId: 2,
            },
        });
        if (!consultant)
            return res.status(404).json({ message: "Consultant introuvable" });
        await prisma.user.delete({
            where: {
                id: id,
                roleId: 2,
            },
        });
        console.log("Consultant supprimé", consultant);
        return res.status(200).json({ message: "Consultant supprimé", consultant });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la suppression du consultant",
            error,
        });
    }
};
export { getAllConsultants, getConsultantById, updateConsultant, deleteConsultant };
