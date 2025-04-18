import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterDialogComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RegisterDialogComponent>);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onRegister() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      this.dialogRef.close(email);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }

}
