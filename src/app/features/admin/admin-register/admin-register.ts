import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-register',
  imports: [ReactiveFormsModule,
    RouterModule],
  templateUrl: './admin-register.html',
  styleUrl: './admin-register.css',
})
export class AdminRegister {
  message = '';
  success = false;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      role: ['ADMIN', Validators.required]
    });
  }

  handleSubmit(): void {

    if (this.registerForm.invalid) {
      this.message = 'Please fill all fields';
      this.success = false;
      return;
    }

    this.authService.registerUser(this.registerForm.value)
      .subscribe({
        next: (resp: any) => {
          if (resp.status === 200) {
            this.message = 'Admin Registered Successfully';
            this.success = true;

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        },

        error: (err) => {
          this.success = false;
          this.message =
            err.error?.message || 'Registration Failed';
        }
      });
  }
}
