import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

//Get all recuiters
const getAllrecuiters = async (req: Request, res: Response) => {
    try {
        const recuiters = await prisma.user.findMany({
            where: {
                roleId: 3,
            },
        });
        if (!recuiters)
            return res.status(404).json({ message: "Aucun recruteur trouvé" });

        return res.status(200).json(recuiters);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la récupération des recruteurs",
            error,
        });
    }
};

//Get one recruiter
const getRecruiterById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "Paramètre manquant" });

        const recruiter = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!recruiter)
            return res.status(404).json({ message: "Recruteur introuvable" });

        return res.status(200).json(recruiter);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la récupération du recruteur",
            error,
        });
    }
};

//update recruiter
const updateRecruiter = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "Paramètre manquant" });

        const {
            firstName,
            lastName,
            societyName,
            email,
            address,
        }: {
            firstName: string;
            lastName: string;
            societyName: string;
            email: string;
            address: string;
        } = req.body;

        if (!societyName || !address)
            return res
                .status(400)
                .json({ message: "L'adresse et le nom de l'entreprise sont obligatoires" });

        const recruiter = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!recruiter)
            return res.status(404).json({ message: "Recruteur introuvable" });

        const updatedRecruiter = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                firstname: firstName,
                lastname: lastName,
                societyName: societyName,
                email: email,
                address: address,
            },
        });
        return res
            .status(200)
            .json({ message: "Recruteur modifié", updatedRecruiter });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la modification du consultant",
            error,
        });
    }
};

//delete recruiter
const deleteRecruiter = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "Paramètre manquant" });

        const recruiter = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!recruiter)
            return res.status(404).json({ message: "Recruteur introuvable" });

        await prisma.user.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).json({ message: "Recruteur supprimé" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur lors de la suppression du recruteur",
            error,
        });
    }
};

export {
    getAllrecuiters,
    getRecruiterById,
    updateRecruiter,
    deleteRecruiter,
};
