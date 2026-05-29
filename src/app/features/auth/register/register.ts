import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  message = {
    type: '',
    text: ''
  };

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({

      firstName: [
        '',
        [Validators.required]
      ],

      lastName: [
        '',
        [Validators.required]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phoneNumber: [
        '',
        [Validators.required]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });
  }

  handleSubmit(): void {

    if (this.registerForm.invalid) {

      this.showMessage(
        'error',
        'Please fill all fields'
      );

      return;
    }

    this.authService
      .registerUser(this.registerForm.value)
      .subscribe({

        next: (resp: any) => {

          if (resp.status === 200) {

            this.showMessage(
              'success',
              'User Registered Successfully'
            );

            setTimeout(() => {

              this.router.navigate(['/login']);

            }, 3000);
          }
        },

        error: (err) => {

          this.showMessage(
            'error',
            err.error?.message || 'Register failed'
          );
        }
      });
  }

  private showMessage(
    type: string,
    text: string
  ): void {

    this.message = { type, text };

    setTimeout(() => {

      this.message = {
        type: '',
        text: ''
      };

    }, 5000);
  }
}
