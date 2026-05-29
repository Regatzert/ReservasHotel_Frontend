import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  error = '';

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required]],

      password: ['', [Validators.required]]

    });
  }

  handleSubmit(): void {

    if (this.loginForm.invalid) {

      this.error = 'Please fill all fields';

      return;
    }

    this.authService
      .loginUser(this.loginForm.value)
      .subscribe({

        next: (resp: any) => {

          this.storageService.saveToken(resp.token);

          this.storageService.saveRole(resp.role);

          this.router.navigate(['/home']);
        },

        error: (err) => {

          this.error =
            err.error?.message || 'Login failed';
        }
      });
  }
}
