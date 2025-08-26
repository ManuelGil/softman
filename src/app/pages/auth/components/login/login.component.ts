import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, finalize, first } from 'rxjs';

import { UserCredentialsModel } from '../../models/user-credentials.model';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = signal(false);
  loginError = signal<string | null>(null);

  // Private fields
  private defaultAuthCredentials: UserCredentialsModel = {
    document: 'CC123',
    password: '123456'
  };
  private subscriptions: Subscription[] = [];

  // Injected services
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      document: [
        this.defaultAuthCredentials.document,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      password: [
        this.defaultAuthCredentials.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.isLoading.set(true);
    this.loginError.set(null);
    
    const loginSubscription = this.authService
      .login(this.form['document'].value, this.form['password'].value)
      .pipe(
        first(),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (user: UserModel | undefined) => {
          if (user) {
            this.router.navigate(['/user/profile']);
          } else {
            this.loginError.set('Credenciales inválidas. Por favor, verifica tu documento y contraseña.');
          }
        },
        error: (error) => {
          this.loginError.set('Error en el servidor. Por favor, intenta nuevamente más tarde.');
        }
      });

    this.subscriptions.push(loginSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
