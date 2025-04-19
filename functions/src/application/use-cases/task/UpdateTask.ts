import { Task } from '../../../domain/entities/Task';
import { TaskRepository } from '../../../domain/repositories/TaskRepository';

export class UpdateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string, taskData: Partial<Task>): Promise<any> {
    return await this.taskRepository.update(id, taskData);
  }
}
