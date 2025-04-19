import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { LoginUser } from "../use-cases/auth/LoginUser";
import { RegisterUser } from "../use-cases/auth/RegisterUser";

export class AuthService {
    private registerUser: RegisterUser;
    private loginUser: LoginUser;

    constructor(authRepository: AuthRepository) {
        this.registerUser = new RegisterUser(authRepository);
        this.loginUser = new LoginUser(authRepository);
    }

    async register(user: User): Promise<User> {
        return this.registerUser.execute(user);
    }

    async login(email: string): Promise<{ token: string; user: User; }> {
        return this.loginUser.execute(email);
    }
}