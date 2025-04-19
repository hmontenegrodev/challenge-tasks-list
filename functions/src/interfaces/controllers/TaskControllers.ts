import { Request, Response } from "express";
import { Task } from "../../domain/entities/Task";
import { FirebaseTaskRepository } from "../../infractruture/persistence/FirebaseTaskRepository";
import { CreateTask } from "../../application/use-cases/task/CreateTask";
import { GetTasks } from "../../application/use-cases/task/GetTasks";
import { TaskService } from "../../application/services/TaskService";

const taskRepository = new FirebaseTaskRepository();
const taskService = new TaskService(taskRepository);

export class TaskController {
    static async createTask(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, userId } = req.body;
            if (!userId) {
                res.status(401).json({ message: "No autorizado" });
                return
            }

            const newTask = {
                title,
                description,
                userId,
                completed: false,
                favorite: false,
            } as Task;

            const task = await taskService.create(newTask);
            res.status(201).json(task);

        } catch (err) {
            res.status(400).json({ message: (err as Error).message });
        }
    }

    static async getByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params?.userId;
            if (!userId) {
                res.status(401).json({ message: "No autorizado" });
                return;
            }
            const result = await taskService.getByUserId(userId);
            res.status(200).json(result);

        } catch (err) {
            res.status(500).json({ message: (err as Error).message });
        }
    }

    static async updateTask(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const task = req.body;
            const result = await taskService.update(id, task);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).json({ message: (err as Error).message });
        }
    };

    static async deleteTask(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await taskService.delete(id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: (err as Error).message });
        }
    };
}