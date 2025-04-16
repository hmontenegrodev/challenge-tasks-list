import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { CreateTask } from "../use-cases/task/CreateTask";
import { DeleteTask } from "../use-cases/task/DeleteTask";
import { GetTasks } from "../use-cases/task/GetTasks";
import { UpdateTask } from "../use-cases/task/UpdateTask";


export class TaskService {
    private createTask: CreateTask;
    private getTasks: GetTasks;
    private updateTask: UpdateTask;
    private deleteTask: DeleteTask;

    constructor(taskRepository: TaskRepository) {
        this.createTask = new CreateTask(taskRepository);
        this.getTasks = new GetTasks(taskRepository);
        this.updateTask = new UpdateTask(taskRepository);
        this.deleteTask = new DeleteTask(taskRepository);

    }

    async create(task: Task): Promise<string> {
        return this.createTask.execute(task);
    }

    async getByUserId(userId: string): Promise<Task[]> {
        return this.getTasks.execute(userId);
    }

    async update(id: string, task: Partial<Task>): Promise<void> {
        return this.updateTask.execute(id, task);
    }

    async delete(id: string): Promise<void> {
        return this.deleteTask.execute(id);
    }
}