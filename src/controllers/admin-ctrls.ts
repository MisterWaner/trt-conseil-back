import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export class AdminController {
    async getAllAdmins(req: Request, res: Response) {
        try {
            const admins = await prisma.user.findMany({
                where: {
                    roleId: 1,
                },
            });
            if (!admins)
                return res
                    .status(404)
                    .json({ message: "Aucun administrateur trouvé" });

            return res.status(200).json(admins);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération des administrateurs",
                error,
            });
        }
    }

    async getAdminById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const admin = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!admin)
                return res
                    .status(404)
                    .json({ message: "Administrateur introuvable" });

            return res.status(200).json(admin);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la récupération de l'administrateur",
                error,
            });
        }
    }

    async updateAdmin(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const {
                email,
                firstName,
                lastName,
            }: { email: string; firstName: string; lastName: string } =
                req.body;

            if (!email || !firstName || !lastName)
                return res
                    .status(400)
                    .json({ message: "Tous les champs sont obligatoires" });

            const admin = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!admin)
                return res
                    .status(404)
                    .json({ message: "Administrateur introuvable" });

            const updatedAdmin = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    email: email,
                    firstname: firstName,
                    lastname: lastName,
                },
            });
            return res
                .status(200)
                .json({ message: "Administrateur modifié", updatedAdmin });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la modification de l'administrateur",
                error,
            });
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const admin = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!admin)
                return res
                    .status(404)
                    .json({ message: "Administrateur introuvable" });

            await prisma.user.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({ message: "Administrateur supprimé" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur lors de la suppression de l'administrateur",
                error,
            });
        }
    }
}

