"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthRepository = void 0;
const firebase_1 = require("../firebase/firebase");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const functions = __importStar(require("firebase-functions"));
class FirebaseAuthRepository {
    constructor() {
        this.docRef = firebase_1.db.collection("users");
    }
    async register(user) {
        const snapshot = await this.docRef.where("email", "==", user.email).get();
        if (!snapshot.empty) {
            throw new Error("Usuario existente");
        }
        const newUser = {
            email: user.email,
            createdAt: new Date(),
        };
        const newDocRef = await this.docRef.add(newUser);
        const token = jsonwebtoken_1.default.sign({ email: newUser.email, uid: newDocRef.id }, functions.config().env.jwt_secret, { expiresIn: '1h' });
        const result = {
            id: newDocRef.id,
            email: newUser.email,
        };
        return {
            token,
            user: result
        };
    }
    async login(email) {
        const snapshot = await this.docRef.where("email", "==", email).get();
        if (snapshot.empty) {
            throw new Error("Usuario no encontrado");
        }
        const userData = snapshot.docs[0].data();
        const token = jsonwebtoken_1.default.sign({ email: userData.email, uid: snapshot.docs[0].id }, functions.config().env.jwt_secret, { expiresIn: '1h' });
        const user = {
            email: userData.email,
            id: snapshot.docs[0].id,
        };
        return {
            token,
            user
        };
    }
}
exports.FirebaseAuthRepository = FirebaseAuthRepository;
