import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

//Generate token
export async function generateToken(id: string) {
    const maxAge: number = 3600000;
    const secret: string = process.env.JWT_SECRET || '';

    const token = jwt.sign({
        id
    }, secret, {
        expiresIn: maxAge
    });
    
    return token;
}