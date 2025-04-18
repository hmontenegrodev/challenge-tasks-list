import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {
  private taskService = inject(TaskService);

  ngOnInit() {
    this.taskService.getTasks();
  }

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  onSubmit() {
    if (this.form.invalid) return;
    const { title, description } = this.form.value!;
    this.taskService.addTask(title!, description!).subscribe(() => {
      this.form.reset();
    });
  }
}
