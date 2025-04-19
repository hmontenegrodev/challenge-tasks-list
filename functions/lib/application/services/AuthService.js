"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const LoginUser_1 = require("../use-cases/auth/LoginUser");
const RegisterUser_1 = require("../use-cases/auth/RegisterUser");
class AuthService {
    constructor(authRepository) {
        this.registerUser = new RegisterUser_1.RegisterUser(authRepository);
        this.loginUser = new LoginUser_1.LoginUser(authRepository);
    }
    async register(user) {
        return this.registerUser.execute(user);
    }
    async login(email) {
        return this.loginUser.execute(email);
    }
}
exports.AuthService = AuthService;
