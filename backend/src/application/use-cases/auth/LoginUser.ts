import { AuthRepository } from "../../../domain/repositories/AuthRepository";

export class LoginUser {
    constructor (private authRepository: AuthRepository){}

    async execute(email:string): Promise<{ token: string; email: string; }> {
        return this.authRepository.login(email);
    }
}