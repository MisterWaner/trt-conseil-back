import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
//Generate token
/**
 * Generates a JWT token for the given user.
 * @param user - The user object.
 * @returns The generated JWT token.
 */
export async function generateToken(user) {
    const maxAge = 3600000;
    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        roleId: user.roleId,
    }, secret, {
        expiresIn: maxAge,
    });
    return token;
}
