import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

//get all applications
const getAllApplications = async (req: Request, res: Response) => {
    try {
        const applications = await prisma.application.findMany();
        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la récupération des candidatures": error,
        });
    }
};

//get one application
const getOneApplication = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        if (!id) return res.status(400).json({ message: "Paramètre manquant" });

        let application = await prisma.application.findUnique({
            where: {
                id: id,
            },
        });
        if (!application)
            return res.status(404).json({ message: "Application introuvable" });

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

//post application
const postApplication = async (req: Request, res: Response) => {
    try {
        const { offerId, userId }: { offerId: string; userId: string } =
            await req.body;

        if (!offerId)
            return res.status(400).json({ message: "Paramètre manquant" });

        // Check if offer exists
        const offer = await prisma.offer.findUnique({
            where: {
                reference: offerId,
            },
        });

        if (!offer) {
            return res.status(404).json({ message: "Offre non trouvée" });
        }

        // Check if user exists
        const candidate = await prisma.user.findUnique({
            where: {
                id: userId,
                roleId: 4,
            },
        });
        if (!candidate) {
            return res.status(404).json({ message: "Candidat non trouvé" });
        }

        // Check if application already exists
        const application = await prisma.application.findFirst({
            where: {
                offerId: offerId,
                userId: userId,
            },
        });
        if (application)
            return res
                .status(400)
                .json({ message: "Vous avez déjà postulé à cette offre" });

        // Create application
        const newApplication = await prisma.application.create({
            data: {
                offerId: offerId,
                userId: userId,
                applicationDate: new Date(),
            },
        });

        return res
            .status(201)
            .json({ message: "Candidature créée", newApplication });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
};

//delete application
const deleteApplication = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        if (!id) return res.status(400).json({ message: "Paramètre manquant" });

        const application = await prisma.application.findUnique({
            where: {
                id: id,
            },
        });
        if (!application)
            return res.status(404).json({ message: "Application introuvable" });

        await prisma.application.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: "Candidature supprimée" });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Erreur lors de la suppression" });
    }
};

//Get all applications for one offer
const getAllApplicationsByOffer = async (req: Request, res: Response) => {
    try {
        const offerId: string = req.params.id;

        if (!offerId)
            return res.status(400).json({ message: "Paramètre manquant" });

        const applications = await prisma.application.findMany({
            where: {
                offerId: offerId,
            },
        });

        if (!applications)
            return res
                .status(404)
                .json({ message: "Aucune candidature trouvée" });

        res.status(200).json(applications);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Erreur lors de la récupération" });
    }
};

//Get all applications for one user
const getAllApplicationsByCandidate = async (req: Request, res: Response) => {
    try {
        const candidateId: string = req.params.id;

        if (!candidateId)
            return res.status(400).json({ message: "Paramètre manquant" });

        const applications = await prisma.application.findMany({
            where: {
                userId: candidateId,
            },
        });

        if (!applications)
            return res
                .status(404)
                .json({ message: "Aucune candidature trouvée" });

        res.status(200).json(applications);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Erreur lors de la récupération" });
    }
};

//export controllers
export {
    getAllApplications,
    getOneApplication,
    postApplication,
    deleteApplication,
    getAllApplicationsByOffer,
    getAllApplicationsByCandidate,
};
