import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatListModule } from '@angular/material/list';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent { 
  private taskService = inject(TaskService);

  tasks$ = this.taskService.tasks$;

  trackById = (index: number, task: Task) => task.id!;

  pendingTasksCount$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => !task.completed).length)
  );

}
