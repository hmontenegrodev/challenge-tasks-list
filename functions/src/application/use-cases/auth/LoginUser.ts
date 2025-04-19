import { User } from "../../../domain/entities/User";
import { AuthRepository } from "../../../domain/repositories/AuthRepository";

export class LoginUser {
    constructor (private authRepository: AuthRepository){}

    async execute(email:string): Promise<{ token: string; user: User; }> {
        const { token, user } = await this.authRepository.login(email);
        return { token, user };
    }
}