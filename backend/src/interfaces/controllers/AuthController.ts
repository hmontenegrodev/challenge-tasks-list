import { Request, Response } from "express";
import { AuthService } from "../../application/services/AuthService";
import { FirebaseAuthRepository } from "../../infractruture/persistence/FirebaseAuthRepository";

const authRepository = new FirebaseAuthRepository();
const authService = new AuthService(authRepository);

export class AuthController {

    static async register(req: Request, res: Response) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const token = await authService.login(email);
            res.status(200).json(token);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }
}