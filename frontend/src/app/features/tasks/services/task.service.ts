import { inject, Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TaskService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private readonly baseUrl = `${environment.apiBaseUrl}/tasks`;

    private taskSubject = new BehaviorSubject<Task[]>([]);
    tasks$ = this.taskSubject.asObservable();

    getTasks(): void {
        this.authService.currentUser$.pipe(
            switchMap(user => {
                if (!user?.id) return of([]);
                const url = `${this.baseUrl}/${user.id}`;
                return this.http.get<Task[]>(url);
            }),
            tap(tasks => { this.taskSubject.next(tasks) }),
        ).subscribe();
    }

    addTask(title: string, description: string): Observable<Task | null> {
        return this.authService.currentUser$.pipe(
            switchMap(user => {
                if (!user?.id) return of(null);

                const body = {
                    title,
                    description,
                    userId: user.id,
                }
                return this.http.post<Task>(this.baseUrl, body).pipe(
                    tap((newTask: Task) => {
                        const currentTasks = this.taskSubject.getValue();
                        this.taskSubject.next([newTask, ...currentTasks]);
                    }));
            }))
    }
    /* 
    
    updateTask(taskId: string, updatedTask: Partial<Task>): Observable<void>  {
            const index = this.tasks$.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }
        }
        deleteTask(taskId: string): void {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        } */
}