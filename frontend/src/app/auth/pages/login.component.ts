import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  form = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
  });

  showRegister = false;

  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;

      if (email) {
        const action = this.showRegister
          ? this.authService.register(email) :
          this.authService.login(email);
        action.subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: (error) => {
            alert('Usuario no existe.');
          }
        })
      } else {
        console.error('Email is required');
      }
      console.log('Form submitted:', email);
    } else {
      console.log('Form is invalid');
    }
  }


}
