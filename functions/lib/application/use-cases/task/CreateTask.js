"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTask = void 0;
class CreateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(task) {
        return await this.taskRepository.create(task);
    }
}
exports.CreateTask = CreateTask;
