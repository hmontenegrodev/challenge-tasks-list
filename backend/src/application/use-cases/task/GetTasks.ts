import { TaskRepository } from "../../../domain/repositories/TaskRepository";

export class GetTasks {
    constructor(private taskRepository: TaskRepository) { }
    async execute(userId:string): Promise<any> {
        return await this.taskRepository.getTasksByUserId(userId);
    }
}