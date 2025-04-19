import { TaskRepository } from '../../../domain/repositories/TaskRepository';

export class DeleteTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
