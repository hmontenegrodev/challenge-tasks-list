import { User } from "../entities/User";

export interface AuthRepository {
    register(user: User): Promise<User>;
    login(email: string): Promise<{ token: string; email: string }>
}