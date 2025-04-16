import { User } from "../../../domain/entities/User";
import { AuthRepository } from "../../../domain/repositories/AuthRepository";

export class RegisterUser {
    constructor (private authRepository: AuthRepository){}

    async execute(user:User): Promise<User> {
        return this.authRepository.register(user);
    }
}