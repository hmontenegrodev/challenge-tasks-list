import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/entities/User";
import jwt from "jsonwebtoken";
import * as functions from 'firebase-functions';

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction):void => {
    const token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No se recibio token' });
        return;
    }

    const tokenValue = token.split(' ')[1];

    try {
        const decoded = jwt.verify(tokenValue, functions.config().env.jwt_secret as string) as User;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token no valido o expirado' });
    }

}