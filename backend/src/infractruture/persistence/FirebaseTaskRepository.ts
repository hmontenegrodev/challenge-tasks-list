import { create } from "domain";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { db } from "../firebase/firebase";

export class FirebaseTaskRepository implements TaskRepository {
    private collection = db.collection("tasks");

    async createTask(task: Task): Promise<Task> {
        const docRef = this.collection.doc();

        const newTask = { ...task, id: docRef.id, createdAt: new Date().toISOString() };
        await docRef.set(newTask);
        return newTask;
    }
    
    async updateTask(id: string, task: Task): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    
    async deleteTask(id: string): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async markAsFavorite(id: string, mark: boolean): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async getTasksByUserId(userId: string): Promise<Task[]> {
        const snapshot = await this.collection.where("userId", "==", userId).get();
        const tasks: Task[] = [];

        snapshot.forEach((doc) => {
            const taskData = doc.data() as Task;
            tasks.push({ ...taskData, id: doc.id });
        });

        return tasks;
    }
}