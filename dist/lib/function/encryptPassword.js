import bcrypt from "bcrypt";
//Function to encrypt password
export async function encryptPassword(password) {
    const salt = process.env.BCRYPT_SALT_ROUND;
    const hashPassword = await bcrypt.hash(password, parseInt(salt));
    return hashPassword;
}
