import { Task } from "../entities/Task";

export interface TaskRepository {
    createTask(task: Task): Promise<Task>;
    updateTask(id: string, task: Task): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    markAsFavorite(id: string, mark:boolean): Promise<Task>;
    getTasksByUserId(userId: string): Promise<Task[]>;
}