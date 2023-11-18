/*************** USER CONTROLLER ***********/
import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                orderBy: {
                    roleId: "asc",
                },
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getOneUser(req: Request, res: Response) {
        try {
            const id: string = req.params.id;

            if (!id)
                return res.status(400).json({ message: "Paramètre manquant" });

            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user)
                return res
                    .status(404)
                    .json({ message: "Utilisateur introuvable" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}