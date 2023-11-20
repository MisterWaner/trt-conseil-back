import { prisma } from "../lib/prisma.js";
import nodemailer from "nodemailer";
import fs from "fs";
import { config } from "dotenv";
config();
export class ApplicationController {
    //get all applications
    async getAllApplications(req, res) {
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
    }
    //get one application
    async getOneApplication(req, res) {
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
                return res
                    .status(404)
                    .json({ message: "Application introuvable" });
            res.status(200).json(application);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    //post application
    async postApplication(req, res) {
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
                    userId: candidate.id,
                    applicationDate: new Date(),
                },
            });
            /***********  Send email to recruiter ***********/
            const recruiter = await prisma.user.findUnique({
                where: {
                    id: offer.userId,
                },
            });
            if (!recruiter)
                return res
                    .status(404)
                    .json({ message: "Recruteur introuvable" });
            const resume = await prisma.resume.findFirst({
                where: {
                    userId: candidate.id,
                },
            });
            if (!resume)
                return res.status(404).json({ message: "CV introuvable" });
            const transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587,
                secure: false,
                tls: {
                    ciphers: "SSLv3",
                },
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: "pofeviv871@ikanid.com",
                subject: "Test",
                text: `Bonjour ${recruiter.firstname} ${recruiter.lastname},
                
                Je vous informe qu'un nouveau candidat a postulé au poste de ${offer.title}.
                Voici les informations du candidat :
                    * Nom : ${candidate.lastname}
                    * Prénom : ${candidate.firstname}
                    * Email : ${candidate.email}
                    * CV en pièce jointe
                     
                Cordialement,
                
                L'équipe de TRT-Conseil.`,
                attachments: [{
                        filename: `${resume.name}`,
                        content: fs.readFileSync(`upload/resumes/${resume.name}`)
                    }],
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
            return res
                .status(201)
                .json({ message: "Candidature créée", newApplication });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ message: "Erreur lors de la création" });
        }
    }
    //delete application
    async deleteApplication(req, res) {
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
                return res
                    .status(404)
                    .json({ message: "Application introuvable" });
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
    }
    //Get all applications for one offer
    async getAllApplicationsByOffer(req, res) {
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
    }
    //Get all applications for one user
    async getAllApplicationsByCandidate(req, res) {
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
    }
    //Get all applications for one recruiter
    async getAllApplicationsByRecruiter(req, res) {
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
            const applications = await prisma.application.findMany({
                where: {
                    offer: {
                        userId: id,
                    },
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
    }
}
