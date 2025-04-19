import { User } from "../../../domain/entities/User";
import { AuthRepository } from "../../../domain/repositories/AuthRepository";

export class RegisterUser {
    constructor (private authRepository: AuthRepository){}

    async execute(user:User): Promise<User> {
        const result = await this.authRepository.register(user);
        return result.user;
    }
}