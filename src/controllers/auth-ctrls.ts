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

export class AuthController {
    //create admin
    async createAdmin(req: Request, res: Response) {
        try {
            const { email, password }: { email: string; password: string } =
                req.body;
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
                    roleId: 1,
                    isApproved: true,
                },
            });

            return res
                .status(201)
                .json({ newAdmin, password, message: "Admin créé" });
        } catch (error) {}
    }

    //create consultant
    async createConsultant(req: Request, res: Response) {
        try {
            const {
                firstname,
                lastname,
            }: { firstname: string; lastname: string } = req.body;
            if (!firstname || !lastname)
                return res
                    .status(400)
                    .json("Tours les champs sont obligatoires");

            //Generate email address
            const generatedEmail: string = generateEmail(firstname, lastname);

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
                    roleId: 2,
                    isApproved: true,
                },
            });

            return res.status(201).json({
                newConsultant,
                generatedPassword,
                message: "Consultant créé",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur lors de la création",
                error,
            });
        }
    }

    //Register
    register = async (req: Request, res: Response) => {
        try {
            const {
                email,
                password,
                confirmation,
                roleId,
            }: {
                email: string;
                password: string;
                confirmation: string;
                roleId: string;
            } = req.body;

            if (roleId === "3" || roleId === "4") {
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
                if (user)
                    return res.status(400).json("L'utilisateur existe déjà");

                //Hash password
                const hashPassword: string = await encryptPassword(password);

                if (roleId === "3") {
                    //Creation of recruiter
                    const newRecruiter = await prisma.user.create({
                        data: {
                            email: email,
                            password: hashPassword,
                            roleId: parseInt(roleId),
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
                            roleId: parseInt(roleId),
                            isApproved: false,
                        },
                    });
                    return res.status(201).json({
                        newCandidate,
                        password,
                        message: "Candidat créé",
                    });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur lors de la création",
                error,
            });
        }
    };

    //Login
    login = async (req: Request, res: Response) => {
        try {
            const { email, password }: { email: string; password: string } =
                req.body;
            
            if (!email || !password)
                return res
                    .status(400)
                    .json("Tours les champs sont obligatoires");
            
            //Authenticate user
            const user = await authenticate(email, password);
            if (!user) {
                return res.status(401).json({
                    message: "Utilisateur ou mot de passe incorrect",
                });
            }

            //Generate token
            const token = await generateToken(user);
            console.log(token);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 3600000,
            });
            return res.status(200).json({
                id: user?.id,
                token: token,
                isApproved: user?.isApproved,
                roleId: user?.roleId,
                email: user?.email,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur lors de la connexion",
                error,
            });
        }
    };

    //Logout
    logout = async (req: Request, res: Response) => {
        try {
            //Clear cookie
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
}
