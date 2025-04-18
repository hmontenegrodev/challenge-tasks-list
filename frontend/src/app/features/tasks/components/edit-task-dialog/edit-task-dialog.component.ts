import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss',

})
export class EditTaskDialogComponent {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<EditTaskDialogComponent>);
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task) {
    this.form = this.fb.group({
      title: [task.title, Validators.required],
      description: [task.description],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.task,
        ...this.form.value,
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
