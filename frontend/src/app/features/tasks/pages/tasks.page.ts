import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskFormComponent } from "../components/task-form.component";
import { TaskListComponent } from "../components/task-list.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage {

}
