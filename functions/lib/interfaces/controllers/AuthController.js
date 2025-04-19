"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../../application/services/AuthService");
const FirebaseAuthRepository_1 = require("../../infractruture/persistence/FirebaseAuthRepository");
const authRepository = new FirebaseAuthRepository_1.FirebaseAuthRepository();
const authService = new AuthService_1.AuthService(authRepository);
class AuthController {
    static async register(req, res) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async login(req, res) {
        try {
            const { email } = req.body;
            const token = await authService.login(email);
            res.status(200).json(token);
        }
        catch (err) {
            res.status(401).json({ message: err.message });
        }
    }
}
exports.AuthController = AuthController;
