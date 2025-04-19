"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseTaskRepository = void 0;
const firebase_1 = require("../firebase/firebase");
class FirebaseTaskRepository {
    constructor() {
        this.collection = firebase_1.db.collection("tasks");
    }
    async create(task) {
        const docRef = this.collection.doc();
        const newTask = { ...task, id: docRef.id, createdAt: new Date().toISOString() };
        await docRef.set(newTask);
        return newTask;
    }
    async update(id, task) {
        const taskRef = firebase_1.db.collection('tasks').doc(id);
        const doc = await taskRef.get();
        if (!doc.exists) {
            throw new Error(`Tarea con id ${id} no encontrada`);
        }
        const updateTask = { ...task, updatedAt: new Date().toISOString() };
        await doc.ref.update(updateTask);
        const updatedTaskDoc = await taskRef.get();
        const updatedTask = { id: updatedTaskDoc.id, ...updatedTaskDoc.data() };
        return updatedTask;
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
    async getTasksByUserId(userId) {
        const snapshot = await this.collection.where("userId", "==", userId).orderBy('createdAt', 'desc').get();
        const tasks = [];
        snapshot.forEach((doc) => {
            const taskData = doc.data();
            tasks.push({ ...taskData, id: doc.id });
        });
        return tasks;
    }
}
exports.FirebaseTaskRepository = FirebaseTaskRepository;
