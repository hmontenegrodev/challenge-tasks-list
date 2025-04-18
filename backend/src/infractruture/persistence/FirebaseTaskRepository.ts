import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { db } from "../firebase/firebase";

export class FirebaseTaskRepository implements TaskRepository {
    private collection = db.collection("tasks");

    async create(task: Task): Promise<Task> {
        const docRef = this.collection.doc();

        const newTask = { ...task, id: docRef.id, createdAt: new Date().toISOString() };
        await docRef.set(newTask);
        return newTask;
    }

    async update(id: string, task: Partial<Task>): Promise<Task> {
        const taskRef = db.collection('tasks').doc(id);
        const doc = await taskRef.get();
        if (!doc.exists) {
            throw new Error(`Tarea con id ${id} no encontrada`);
        }
        const updateTask = { ...task, updatedAt: new Date().toISOString() };
        await doc.ref.update(updateTask);

        const updatedTaskDoc = await taskRef.get();
        const updatedTask = { id: updatedTaskDoc.id, ...updatedTaskDoc.data() };
        return updatedTask as Task;
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }

    async getTasksByUserId(userId: string): Promise<Task[]> {
        const snapshot = await this.collection.where("userId", "==", userId).orderBy('createdAt', 'desc').get();
        const tasks: Task[] = [];

        snapshot.forEach((doc) => {
            const taskData = doc.data() as Task;
            tasks.push({ ...taskData, id: doc.id });
        });

        return tasks;
    }
}