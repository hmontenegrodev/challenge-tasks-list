import { Request, Response } from "express";
import { Task } from "../../domain/entities/Task";
import { FirebaseTaskRepository } from "../../infractruture/persistence/FirebaseTaskRepository";
import { CreateTask } from "../../application/use-cases/task/CreateTask";
import { GetTasks } from "../../application/use-cases/task/GetTasks";


const taskRepository = new FirebaseTaskRepository();

export class TaskController {
    static async createTask(req: Request, res: Response) {
        try {
            const { title, description } = req.body;
            const userId = req.body?.uid;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const newTask = {
                title,
                description,
                userId,
                completed: false,
                favorite: false,
            } as Task;

            const useCase = new CreateTask(taskRepository);
            const task = await useCase.execute(newTask);
            res.status(201).json(task);

        } catch (err) {
            res.status(400).json({ message: (err as Error).message });
        }
    }

    static async getByUser(req: Request, res: Response) {
        try {
            const userId = req.body?.uid;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const useCase = new GetTasks(taskRepository);
            const result = await useCase.execute(userId);
            res.status(200).json(result);

        } catch (err) {
            res.status(500).json({ message: (err as Error).message });
        }
    }
}