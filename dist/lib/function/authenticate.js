import bcrypt from 'bcrypt';
import { prisma } from '../prisma.js';
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
