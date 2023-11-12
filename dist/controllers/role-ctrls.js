import { prisma } from "../lib/prisma.js";
//Post role
const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Le nom est obligatoire" });
        }
        const role = await prisma.role.findUnique({
            where: {
                name,
            },
        });
        if (role) {
            return res.status(400).json({ error: "Ce nom de rôle existe déjà" });
        }
        const newRole = await prisma.role.create({
            data: {
                name,
            },
        });
        return res.status(201).json({ "Le rôle a bien été créé": newRole });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la création" });
    }
};
//Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await prisma.role.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return res.status(200).json(roles);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la récupération" });
    }
};
//Get one role
const getOneRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await prisma.role.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!role) {
            return res.status(404).json({ error: "Ce rôle n'existe pas" });
        }
        return res.status(200).json(role);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la récupération" });
    }
};
//Update role
const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Le nom est obligatoire" });
        }
        const role = await prisma.role.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!role) {
            return res.status(404).json({ error: "Ce rôle n'existe pas" });
        }
        const updatedRole = await prisma.role.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
            },
        });
        return res.status(200).json({ "Le rôle a bien été modifié": updatedRole });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la modification" });
    }
};
//Delete role
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await prisma.role.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!role) {
            return res.status(404).json({ error: "Ce rôle n'existe pas" });
        }
        await prisma.role.delete({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({ "Le rôle a bien été supprimé": role });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la suppression" });
    }
};
export { createRole, getAllRoles, getOneRole, updateRole, deleteRole };
