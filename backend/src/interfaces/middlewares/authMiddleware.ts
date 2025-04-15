import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/entities/User";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No se recibio token' });
    }

    const tokenValue = token.split(' ')[1];

    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET as string) as User;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token no valido' });

    }

}