import { User } from "../entities/User";

export interface AuthRepository {
    register(user: User): Promise<{ token: string; user: User }>;
    login(email: string): Promise<{ token: string; user: User }>;
}