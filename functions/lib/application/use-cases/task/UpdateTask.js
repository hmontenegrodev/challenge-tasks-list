"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTask = void 0;
class UpdateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id, taskData) {
        return await this.taskRepository.update(id, taskData);
    }
}
exports.UpdateTask = UpdateTask;
