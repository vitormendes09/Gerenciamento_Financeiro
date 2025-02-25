import jwt from 'jsonwebtoken';
import { IUser } from '../../contract/entities/IUser';

const SECRET = process.env.SECRET as string;

export class AuthService {
    static verifyToken(token: string) {
        throw new Error("Method not implemented.");
    }
    static generateToken(user: IUser) {
        return jwt.sign({ user }, SECRET, { expiresIn: '1d' });
    }

    static decodeToken(token: string): IUser | null {
        try {
            const decoded = jwt.verify(token, SECRET) as { user: IUser };
            return decoded.user;
        } catch (error) {
            return null;
        }
    }
}