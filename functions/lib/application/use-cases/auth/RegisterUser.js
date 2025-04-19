"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
class RegisterUser {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(user) {
        const result = await this.authRepository.register(user);
        return result.user;
    }
}
exports.RegisterUser = RegisterUser;
