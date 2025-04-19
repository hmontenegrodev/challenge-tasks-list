"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
class LoginUser {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(email) {
        const { token, user } = await this.authRepository.login(email);
        return { token, user };
    }
}
exports.LoginUser = LoginUser;
