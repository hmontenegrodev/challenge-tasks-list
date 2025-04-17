import { inject, Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, of, switchMap } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Injectable({ providedIn: 'root' })
export class TaskService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private readonly baseUrl = `${environment.apiBaseUrl}/tasks`;

    private tasks: Task[] = [];

    getTasks(): Observable<Task[]> {
        return this.authService.currentUser$.pipe(
            switchMap(user => {
                if (!user?.id) return of([]);
                const url = `${this.baseUrl}/${user.id}`;
                return this.http.get<Task[]>(url);
            }
            ))
    }

    /*     addTask(task: Task): void {
            this.tasks.push(task);
        }
    
        updateTask(updatedTask: Task): void {
            const index = this.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }
        }
    
        deleteTask(taskId: string): void {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        } */
}