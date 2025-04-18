import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatListModule } from '@angular/material/list';
import { map } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { LoadingService } from '../../../../shared/components/services/loading.service';
import { FullscreenLoaderComponent } from '../../../../shared/components/fullscreen-loader/fullscreen-loader.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FullscreenLoaderComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);

  tasks$ = this.taskService.tasks$;

  public loadingService: LoadingService = inject(LoadingService);
  loading$ = this.loadingService.loading$;

  trackById = (_index: number, task: Task) => task.id!;

  pendingTasksCount$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => !task.completed).length)
  );

  markCompleted(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed }).subscribe();
  }

  onEdit(task: Task) {

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: task,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((updatedTask: Task | undefined) => {
      this.loadingService.show();

      if (updatedTask) {
        if (updatedTask.id) {
          this.taskService.updateTask(updatedTask.id, updatedTask).subscribe(() => {
            this.loadingService.hide();
          });
        }
      }
    });

  }

  onDelete(task: Task) {
    this.loadingService.show();

    this.taskService.deleteTask(task.id!).subscribe(() => {
      this.loadingService.hide();
    });
  }

}
