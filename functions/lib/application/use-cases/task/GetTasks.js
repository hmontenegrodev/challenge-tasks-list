"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTasks = void 0;
class GetTasks {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(userId) {
        return await this.taskRepository.getTasksByUserId(userId);
    }
}
exports.GetTasks = GetTasks;
