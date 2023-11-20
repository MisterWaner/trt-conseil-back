import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { generateOfferReference } from "../lib/function/generateOfferReference.js";

export class OffersController {
    //Get all offers
    async getAllOffers(req: Request, res: Response) {
        try {
            const offers = await prisma.offer.findMany({
                orderBy: {
                    userId: "asc",
                },
            });
            return res.status(200).json(offers);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la récupération des offres": error,
            });
        }
    }

    //Get offer by id
    async getOneOffer(req: Request, res: Response) {
        try {
            const id: string = req.params.id;

            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const offer = await prisma.offer.findUnique({
                where: {
                    id: id,
                },
            });
            if (!offer)
                return res.status(404).json({ message: "Offre introuvable" });

            return res.status(200).json(offer);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la récupération de l'offre": error,
            });
        }
    }

    //Create offer
    async postOffer(req: Request, res: Response) {
        try {
            const {
                title,
                salary,
                place,
                schedules,
                contractType,
                userId,
            }: {
                title: string;
                salary: number;
                place: string;
                schedules: string;
                contractType: string;
                userId: string;
            } = await req.body;

            if (
                !title ||
                !salary ||
                !place ||
                !schedules ||
                !contractType ||
                !userId
            ) {
                return res
                    .status(400)
                    .json({ message: "Propriété manquantes", data: req.body });
            }

            const offer = await prisma.offer.findFirst({
                where: {
                    title,
                    salary: Number(salary),
                    place,
                    schedules,
                    contractType,
                    userId,
                },
            });

            if (offer)
                return res
                    .status(409)
                    .json({ message: "Offre déjà existante" });

            const recruiter = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            const societyName = recruiter?.societyName;

            const date = new Date();
            const generatedReference = generateOfferReference(
                societyName as string
            );

            const newOffer = await prisma.offer.create({
                data: {
                    reference: generatedReference,
                    title: title,
                    salary: Number(salary),
                    place: place,
                    schedules: schedules,
                    contractType: contractType,
                    publicationDate: date,
                    userId: userId,
                    isApproved: false,
                },
            });

            return res.status(201).json(newOffer);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                "Erreur lors de la création de l'offre": error,
            });
        }
    }

    //Delete offer
    async deleteOffer(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const offer = await prisma.offer.findUnique({
                where: {
                    id: id,
                },
            });
            if (!offer)
                return res.status(404).json({ message: "Offre introuvable" });

            await prisma.offer.delete({
                where: {
                    id: id,
                },
            });

            res.status(200).json({ message: "Offre supprimée" });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la suppression de l'offre": error,
            });
        }
    }

    //Get all offers from one recruiter
    async getAllOffersFromOneRecruiter(req: Request, res: Response) {
        try {
            const id: string = req.params.id;

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

            const offers = await prisma.offer.findMany({
                where: {
                    userId: id,
                },
            });

            res.status(200).json(offers);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la récupération des offres": error,
            });
        }
    }

    //Get offer from one recruiter
    async getOneOfferFromOneRecruiter(req: Request, res: Response) {
        try {
            const recruiterId: string = req.params.id;
            const id: string = req.params.id;

            if (!recruiterId || !id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const recruiter = await prisma.user.findUnique({
                where: {
                    id: recruiterId,
                },
            });
            if (!recruiter)
                return res
                    .status(404)
                    .json({ message: "Recruteur introuvable" });

            const offer = await prisma.offer.findUnique({
                where: {
                    id: id,
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
    }

    //Approve offer
    async approveOffer(req: Request, res: Response) {
        try {
            const id: string = req.params.id;

            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const offer = await prisma.offer.findUnique({
                where: {
                    id: id,
                },
            });
            if (!offer)
                return res.status(404).json({ message: "Offre introuvable" });

            await prisma.offer.update({
                where: {
                    id: id,
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
    }

    //Get all approved offers
    async getAllApprovedOffers(req: Request, res: Response) {
        try {
            const offers = await prisma.offer.findMany({
                where: {
                    isApproved: true,
                },
                orderBy: {
                    userId: "asc",
                },
            });
            res.status(200).json(offers);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "Erreur lors de la récupération des offres": error,
            });
        }
    }

    //Get all unapproved offers
    async getAllUnapprovedOffers(req: Request, res: Response) {
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
    }
}
