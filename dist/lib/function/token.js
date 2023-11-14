import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
//Generate token
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
    console.log(token);
    return token;
}
