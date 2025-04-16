import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { CreateTask } from "../use-cases/task/CreateTask";
import { GetTasks } from "../use-cases/task/GetTasks";


export class TaskService {
private createTask: CreateTask;
private getTasks: GetTasks; 

    constructor(taskRepository: TaskRepository) {
        this.createTask = new CreateTask(taskRepository);
        this.getTasks = new GetTasks(taskRepository);
    
    }

    async create(task: Task): Promise<string> {
        return this.createTask.execute(task);
    }

    async getByUserId(userId: string): Promise<Task[]> {
        return this.getTasks.execute(userId);
    }
}