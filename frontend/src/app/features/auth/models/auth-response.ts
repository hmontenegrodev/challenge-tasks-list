import { User } from "../../../core/models/user";

export interface AuthResponse {
    token: string;
    user:User;
}
