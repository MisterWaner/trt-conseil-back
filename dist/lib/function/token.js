import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
//Generate token
export async function generateToken(id) {
    const maxAge = 3600000;
    const secret = process.env.JWT_SECRET || '';
    const token = jwt.sign({
        id
    }, secret, {
        expiresIn: maxAge
    });
    return token;
}
