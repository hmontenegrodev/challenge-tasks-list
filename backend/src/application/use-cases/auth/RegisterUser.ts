import { User } from "../../../domain/entities/User";
import { AuthRepository } from "../../../domain/repositories/AuthRepository";

export class RegisterUser {
    constructor (private authRepository: AuthRepository){}

    async execute(userData:User): Promise<{ token: string; user: User; }> {
        const { token, user } = await this.authRepository.register(userData);
        return { token, user };
    }
}