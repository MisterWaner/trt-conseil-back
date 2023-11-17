import { prisma } from "../lib/prisma.js";
//get all applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await prisma.application.findMany();
        res.status(200).json(applications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la récupération des candidatures": error,
        });
    }
};
//get one application
const getOneApplication = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Paramètre manquant" });
        let application = await prisma.application.findUnique({
            where: {
                id: id,
            },
        });
        if (!application)
            return res.status(404).json({ message: "Application introuvable" });
        res.status(200).json(application);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//post application
const postApplication = async (req, res) => {
    try {
        const { offerId, userId } = await req.body;
        if (!offerId || !userId)
            return res.status(400).json({ message: "Paramètre manquant" });
        // Check if offer exists
        const offer = await prisma.offer.findUnique({
            where: {
                id: offerId,
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
                .status(409)
                .json({ message: "Vous avez déjà postulé à cette offre" });
        // Create application
        if (!candidate || candidate.isApproved === false) {
            return res
                .status(403)
                .json({ message: "Vous n'êtes pas autorisé à postuler" });
        }
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
};
//delete application
const deleteApplication = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Paramètre manquant" });
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
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Erreur lors de la suppression" });
    }
};
//Get all applications for one offer
const getAllApplicationsByOffer = async (req, res) => {
    try {
        const offerId = req.params.id;
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
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Erreur lors de la récupération" });
    }
};
//Get all applications for one user
const getAllApplicationsByCandidate = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Paramètre manquant" });
        const applications = await prisma.application.findMany({
            where: {
                userId: id,
            },
            include: {
                offer: {
                    include: {
                        user: true,
                    },
                },
                user: true,
            },
        });
        if (!applications)
            return res
                .status(404)
                .json({ message: "Aucune candidature trouvée" });
        res.status(200).json(applications);
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Erreur lors de la récupération" });
    }
};
const getAllApplicationsByRecruiter = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Paramètre manquant" });
        const applications = await prisma.application.findMany({
            where: {
                userId: id,
            },
            include: {
                user: true,
                offer: true
            }
        });
        if (!applications)
            return res
                .status(404)
                .json({ message: "Aucune candidature trouvée" });
        res.status(200).json(applications);
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Erreur lors de la récupération" });
    }
};
//export controllers
export { getAllApplications, getOneApplication, postApplication, deleteApplication, getAllApplicationsByOffer, getAllApplicationsByCandidate, getAllApplicationsByRecruiter, };
