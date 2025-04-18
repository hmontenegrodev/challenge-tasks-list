import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterDialogComponent } from '../components/register-dialog.component';
import { FullscreenLoaderComponent } from "../../../shared/components/fullscreen-loader.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FullscreenLoaderComponent
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  isLoading: boolean = false;
  showRegister: boolean = false;

  form = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
  });


  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  onSubmit(isDialogOpen: boolean = false) {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;

      if (email) {
        let action = this.showRegister
          ? this.authService.register(email) :
          this.authService.login(email);
        if (isDialogOpen) {
          action = this.authService.register(email);
        }
        this.isLoading = true;
        action.subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/tasks'])
          },
          error: (error) => {
            this.isLoading = false;
            if (error.status === 401) {
              this.openRegisterDialog();
            } else if (error.status === 400) {
              this.openSnackBar('Usuario ya existe. Por favor inicie sesión.');
            }
          }
        })
      }
    }
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);
    dialogRef.afterClosed().subscribe((email: string) => {
      if (email) {
        this.form.get('email')?.setValue(email);
        this.onSubmit(true);
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 10000
    });
  }


}
