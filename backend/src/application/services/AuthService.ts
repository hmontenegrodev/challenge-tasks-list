import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { RegisterUser } from "../../domain/use-cases/RegisterUser";

export class AuthService {
    private registerUser: RegisterUser;

    constructor(private authRepository: AuthRepository) {
        this.registerUser = new RegisterUser(authRepository);
    }

    async register(user: User): Promise<User> {
        return this.registerUser.execute(user);
    }

    async login(email: string): Promise<{ token: string; email: string; }> {
        return this.authRepository.login(email);
    }
}