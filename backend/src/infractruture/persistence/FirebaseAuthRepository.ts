import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { db } from "../firebase/firebase";
import jwt from 'jsonwebtoken';

export class FirebaseAuthRepository implements AuthRepository {
    private userRef = db.collection("users");
    async register(user: User): Promise<User> {
        const snapshot = await this.userRef.where("email", "==", user.email).get();
        if (!snapshot.empty) {
            throw new Error("Usuario existente");
        }
        const newUser = {
            email: user.email,
            createdAt: new Date(),
        }
        const docRef = await this.userRef.add(newUser);

        return {
            id: docRef.id,
            email: newUser.email,
            createdAt: newUser.createdAt,
        };
    }

    async login(email: string): Promise<{ token: string; user: User }> {
        const snapshot = await this.userRef.where("email", "==", email).get();
        if (snapshot.empty) {
            throw new Error("Usuario no encontrado");
        }
        const userData = snapshot.docs[0].data() as User;

        const token = jwt.sign(
            { email: userData.email, uid: snapshot.docs[0].id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        const user = {
            email: userData.email,
            id: snapshot.docs[0].id,
        }

        return {
            token,
            user
        };
    }

} 