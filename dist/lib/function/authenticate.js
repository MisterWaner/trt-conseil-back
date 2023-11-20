import bcrypt from 'bcrypt';
import { prisma } from '../prisma.js';
/**
 * Authenticates a user by checking if the provided email and password match a user in the database.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns The authenticated user if the email and password match, otherwise null.
 */
export async function authenticate(email, password) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if (!user)
        return null;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
        return null;
    return user;
}
