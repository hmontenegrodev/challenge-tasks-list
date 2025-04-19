"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const FirebaseTaskRepository_1 = require("../../infractruture/persistence/FirebaseTaskRepository");
const TaskService_1 = require("../../application/services/TaskService");
const taskRepository = new FirebaseTaskRepository_1.FirebaseTaskRepository();
const taskService = new TaskService_1.TaskService(taskRepository);
class TaskController {
    static async createTask(req, res) {
        try {
            const { title, description, userId } = req.body;
            if (!userId) {
                res.status(401).json({ message: "No autorizado" });
                return;
            }
            const newTask = {
                title,
                description,
                userId,
                completed: false,
                favorite: false,
            };
            const task = await taskService.create(newTask);
            res.status(201).json(task);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async getByUser(req, res) {
        try {
            const userId = req.params?.userId;
            if (!userId) {
                res.status(401).json({ message: "No autorizado" });
                return;
            }
            const result = await taskService.getByUserId(userId);
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    static async updateTask(req, res) {
        try {
            const id = req.params.id;
            const task = req.body;
            const result = await taskService.update(id, task);
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    ;
    static async deleteTask(req, res) {
        try {
            const id = req.params.id;
            await taskService.delete(id);
            res.status(204).send();
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    ;
}
exports.TaskController = TaskController;
