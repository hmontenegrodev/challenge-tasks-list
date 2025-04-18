import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskFormComponent } from "../components/task-form.component";
import { TaskListComponent } from "../components/task-list.component";
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskFormComponent,
    TaskListComponent,
    MatButtonModule],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
