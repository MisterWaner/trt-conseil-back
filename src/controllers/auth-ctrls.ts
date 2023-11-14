/*************** AUTHENTICATION CONTROLLER *****************/
import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { encryptPassword } from "../lib/function/encryptPassword.js";
import { config } from "dotenv";
import { generateTemporaryPassword } from "../lib/function/generateTemporaryPassword.js";
import { authenticate } from "../lib/function/authenticate.js";
import { generateToken } from "../lib/function/token.js";
import { generateEmail } from "../lib/function/generateEmail.js";

config();

//Register
const register = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
            confirmation,
            roleId,
            firstName,
            lastName,
        }: {
            email: string;
            password: string;
            confirmation: string;
            roleId: number;
            firstName?: string;
            lastName?: string;
        } = req.body;

        //Creation of admin
        if (roleId === 1) {
            if (!email || !password)
                return res
                    .status(400)
                    .json("Tours les champs sont obligatoires");

            const admin = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (admin) return res.status(400).json("L'utilisateur existe déjà");

            //Hash password
            const hashPassword: string = await encryptPassword(password);

            const newAdmin = await prisma.user.create({
                data: {
                    email: email,
                    password: hashPassword,
                    roleId: roleId,
                    isApproved: true,
                },
            });
            return res
                .status(201)
                .json({ newAdmin, password, message: "Admin créé" });
        } else if (roleId === 2) {
            if (!firstName || !lastName)
                return res.status(400).json("Tours les champs sont obligatoires");

            //Generate email address
            const generatedEmail: string = generateEmail(firstName, lastName);

            const consultant = await prisma.user.findUnique({
                where: {
                    email: generatedEmail,
                },
            });
            if (consultant)
                return res.status(400).json("L'utilisateur existe déjà");

            //Generate password
            const generatedPassword: string = generateTemporaryPassword(20);
            //Hash password
            const hashPassword: string = await encryptPassword(
                generatedPassword
            );

            const newConsultant = await prisma.user.create({
                data: {
                    email: generatedEmail,
                    password: hashPassword,
                    roleId: roleId,
                    isApproved: true,
                },
            });

            return res.status(201).json({
                newConsultant,
                generatedPassword,
                message: "Consultant créé",
            });
        } else if (roleId === 3 || roleId === 4) {
            if (!email || !password || !confirmation || !roleId)
                return res
                    .status(400)
                    .json("Tours les champs sont obligatoires");

            if (password !== confirmation)
                return res
                    .status(400)
                    .json("Les mots de passe ne correspondent pas");

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (user) return res.status(400).json("L'utilisateur existe déjà");

            //Hash password
            const hashPassword: string = await encryptPassword(password);

            if (roleId === 3) {
                //Creation of recruiter
                const newRecruiter = await prisma.user.create({
                    data: {
                        email: email,
                        password: hashPassword,
                        roleId: roleId,
                        isApproved: true,
                    },
                });
                return res.status(201).json({
                    newRecruiter,
                    password,
                    message: "Recruteur créé",
                });
            } else {
                //Creation of candidate
                const newCandidate = await prisma.user.create({
                    data: {
                        email: email,
                        password: hashPassword,
                        roleId: roleId,
                        isApproved: false,
                    },
                });
                return res
                    .status(201)
                    .json({ newCandidate, password, message: "Candidat créé" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création", error });
    }
};

//Login
const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string; password: string } =
            req.body;

        const user = await authenticate(email, password);
        if (!user) {
            res.status(401).json({
                message: "Utilisateur ou mot de passe incorrect",
            });
        }

        const token = await generateToken(user?.id as string);
        console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600000,
        });
        res.status(200).json({
            id: user?.id,
            token: token,
            roleId: user?.roleId,
            email: user?.email,
            firstname: user?.firstname
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
};

//Logout
const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: "Déconnecté" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la déconnexion",
            error,
        });
    }
};

export { register, login, logout };
