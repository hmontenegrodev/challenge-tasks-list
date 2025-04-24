import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { db } from "../firebase/firebase";
import jwt from 'jsonwebtoken';
import * as functions from 'firebase-functions';

export class FirebaseAuthRepository implements AuthRepository {
    private docRef = db.collection("users");
    
    async register(userData: User): Promise<{ token: string; user: User }> {
        const snapshot = await this.docRef.where("email", "==", userData.email).get();
        if (!snapshot.empty) {
            throw new Error("Usuario existente");
        }
        const newUser = {
            email: userData.email,
            createdAt: new Date(),
        }
        const newDocRef = await this.docRef.add(newUser);

        console.log("newDocRef", newDocRef.id);

        const token = jwt.sign(
            { email: newUser.email, uid: newDocRef.id },
            functions.config().env.jwt_secret as string,
            { expiresIn: '1h' }
        );

        const user = {
            id: newDocRef.id,
            email: newUser.email,
        }

        return {
            token,
            user
        };
    }

    async login(email: string): Promise<{ token: string; user: User }> {
        const snapshot = await this.docRef.where("email", "==", email).get();
        if (snapshot.empty) {
            throw new Error("Usuario no encontrado");
        }
        const userData = snapshot.docs[0].data() as User;

        const token = jwt.sign(
            { email: userData.email, uid: snapshot.docs[0].id },
            functions.config().env.jwt_secret as string,
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