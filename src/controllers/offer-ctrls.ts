import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { generateOfferReference } from "../lib/function/generateOfferReference.js";

//Post offer
const postOffer = async (req: Request, res: Response) => {
    try {
        const {
            title,
            salary,
            place,
            schedules,
            contractType,
            offerReference,
        }: {
            title: string;
            salary: number;
            place: string;
            schedules: string;
            contractType: string;
            offerReference: string;
        } = req.body;

        const id: string = req.params.id;

        if (!id) return res.status(400).json({ message: "Paramètre manquant" });

        if (!title || !salary || !place || !schedules || !contractType)
            return res.status(400).json({ message: "Paramètre manquant" });

        const recruiter = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!recruiter)
            return res.status(404).json({ message: "Recruteur introuvable" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: offerReference,
            },
        });

        if (offer)
            return res.status(400).json({ message: "Offre déjà existante" });

        const generatedOfferReference = generateOfferReference(
            recruiter.societyName as string
        );
        const newOffer = await prisma.offer.create({
            data: {
                reference: generatedOfferReference,
                title: title,
                salary: salary,
                place: place,
                schedules: schedules,
                contractType: contractType,
                publicationDate: new Date(),
                userId: recruiter.id,
                isApproved: false,
            },
        });

        res.status(200).json(newOffer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
};

//get all offers
const getAllOffers = async (req: Request, res: Response) => {
    try {
        const offers = await prisma.offer.findMany({
            orderBy: {
                userId: "asc",
            }
        });
        res.status(200).json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la récupération des offres": error,
        });
    }
};

//get one offer
const getOneOffer = async (req: Request, res: Response) => {
    try {
        const offerReference: string = req.params.reference;

        if (!offerReference)
            return res.status(400).json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: offerReference,
            },
        });
        if (!offer)
            return res.status(404).json({ message: "Offre introuvable" });

        res.status(200).json(offer);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la récupération de l'offre": error,
        });
    }
};

//delete offer
const deleteOffer = async (req: Request, res: Response) => {
    try {
        const offerReference: string = req.params.reference;
        const recruiterId: string = req.params.id;

        if (!offerReference)
            return res.status(400).json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: offerReference,
                userId: recruiterId,
            },
        });
        if (!offer)
            return res.status(404).json({ message: "Offre introuvable" });

        await prisma.offer.delete({
            where: {
                reference: offerReference,
                userId: recruiterId,
            },
        });

        res.status(200).json({ message: "Offre supprimée" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la suppression de l'offre": error,
        });
    }
};

//get all offers from one recruiter
const getAllOffersFromOneRecruiter = async (req: Request, res: Response) => {
    try {
        const recruiterId: string = req.params.id;

        if (!recruiterId)
            return res.status(400).json({ message: "Paramètre manquant" });

        const recruiter = await prisma.user.findUnique({
            where: {
                id: recruiterId,
            },
        });
        if (!recruiter)
            return res.status(404).json({ message: "Recruteur introuvable" });

        const offers = await prisma.offer.findMany({
            where: {
                userId: recruiterId,
            },
        });

        res.status(200).json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la récupération des offres": error,
        });
    }
};

//get one offer from one recruiter
const getOneOfferFromOneRecruiter = async (req: Request, res: Response) => {
    try {
        const recruiterId: string = req.params.id;
        const offerReference: string = req.params.reference;

        if (!recruiterId || !offerReference)
            return res.status(400).json({ message: "Paramètre manquant" });

        const recruiter = await prisma.user.findUnique({
            where: {
                id: recruiterId,
            },
        });
        if (!recruiter)
            return res.status(404).json({ message: "Recruteur introuvable" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: offerReference,
                userId: recruiterId,
            },
        });
        if (!offer)
            return res.status(404).json({ message: "Offre introuvable" });

        res.status(200).json(offer);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la récupération de l'offre": error,
        });
    }
};

//approve offer
const approveOffer = async (req: Request, res: Response) => {
    try {
        const offerReference: string = req.params.reference;

        if (!offerReference)
            return res.status(400).json({ message: "Paramètre manquant" });

        const offer = await prisma.offer.findUnique({
            where: {
                reference: offerReference,
            },
        });
        if (!offer)
            return res.status(404).json({ message: "Offre introuvable" });

        await prisma.offer.update({
            where: {
                reference: offerReference,
            },
            data: {
                isApproved: true,
            },
        });

        res.status(200).json({ message: "Offre approuvée" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de l'approbation de l'offre": error,
        });
    }
};

//get all approved offers
const getAllApprovedOffers = async (req: Request, res: Response) => {
    try {
        const offers = await prisma.offer.findMany({
            where: {
                isApproved: true,
            },
            orderBy: {
                userId: "asc",
            }
        });
        res.status(200).json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la récupération des offres": error,
        });
    }
};

//get all unapproved offers
const getAllUnapprovedOffers = async (req: Request, res: Response) => {
    try {
        const offers = await prisma.offer.findMany({
            where: {
                isApproved: false,
            },
        });
        res.status(200).json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "Erreur lors de la récupération des offres": error,
        });
    }
};

//export controllers
export {
    getAllOffers,
    getOneOffer,
    postOffer,
    deleteOffer,
    getAllOffersFromOneRecruiter,
    getOneOfferFromOneRecruiter,
    approveOffer,
    getAllApprovedOffers,
    getAllUnapprovedOffers,
};
