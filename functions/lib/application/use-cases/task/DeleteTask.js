"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTask = void 0;
class DeleteTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id) {
        return this.taskRepository.delete(id);
    }
}
exports.DeleteTask = DeleteTask;
