import { Task } from "../entities/Task";

export interface TaskRepository {
    create(task: Task): Promise<Task>;
    update(id: string, task: Partial<Task>): Promise<Task>;
    delete(id: string): Promise<void>;
    getTasksByUserId(userId: string): Promise<Task[]>;
}