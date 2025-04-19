"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const CreateTask_1 = require("../use-cases/task/CreateTask");
const DeleteTask_1 = require("../use-cases/task/DeleteTask");
const GetTasks_1 = require("../use-cases/task/GetTasks");
const UpdateTask_1 = require("../use-cases/task/UpdateTask");
class TaskService {
    constructor(taskRepository) {
        this.createTask = new CreateTask_1.CreateTask(taskRepository);
        this.getTasks = new GetTasks_1.GetTasks(taskRepository);
        this.updateTask = new UpdateTask_1.UpdateTask(taskRepository);
        this.deleteTask = new DeleteTask_1.DeleteTask(taskRepository);
    }
    async create(task) {
        return this.createTask.execute(task);
    }
    async getByUserId(userId) {
        return this.getTasks.execute(userId);
    }
    async update(id, task) {
        return this.updateTask.execute(id, task);
    }
    async delete(id) {
        return this.deleteTask.execute(id);
    }
}
exports.TaskService = TaskService;
