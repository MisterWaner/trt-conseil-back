import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { encryptPassword } from "../lib/function/encryptPassword.js";
//update Password
const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmation, } = req.body;
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Paramètre manquant" });
        if (!currentPassword || !newPassword || !confirmation)
            return res
                .status(400)
                .json({ message: "Tous les champs sont obligatoires" });
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        //Check if current password is correct
        const decryptedCurrentPassword = await bcrypt.compare(currentPassword, user.password);
        if (!decryptedCurrentPassword)
            return res.status(401).json({ message: "Mot de passe incorrect" });
        //Check if new password and confirmation match
        if (newPassword !== confirmation)
            return res
                .status(400)
                .json({ message: "Les mots de passe ne correspondent pas" });
        //Encrypt new password
        const newHashedPassword = await encryptPassword(newPassword);
        //Update password
        const updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: newHashedPassword,
            },
        });
        res.status(200).json({ message: "Mot de passe modifié", updatedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la modification du mot de passe",
            error,
        });
    }
};
export { updatePassword };
