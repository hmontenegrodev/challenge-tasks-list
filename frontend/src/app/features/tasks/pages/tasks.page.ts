import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskFormComponent } from "../components/task-form/task-form.component";
import { TaskListComponent } from "../components/task-list/task-list.component";
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskFormComponent,
    TaskListComponent,
    MatButtonModule,
    NavbarComponent
],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage {

}
