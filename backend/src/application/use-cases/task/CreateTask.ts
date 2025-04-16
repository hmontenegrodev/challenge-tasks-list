import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../domain/repositories/TaskRepository";

export class CreateTask {
    constructor(private taskRepository: TaskRepository) { }
    async execute(task: Task): Promise<any> {
        return await this.taskRepository.create(task);
    }
}