import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dotnet-api',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule, // Agrega RouterModule aquí
  ],
  templateUrl: './dotnet-api.component.html',
  styleUrls: ['./dotnet-api.component.css'],
})
export class DotnetApiComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  loginError: string | null = null;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/nodejs-api']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.authService.login(response.token);
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('email', response.email);
          localStorage.setItem('firstName', response.firstName);
          localStorage.setItem('lastName', response.lastName);
          this.loginError = null;
          this.toastr.success('Login exitoso', 'Bienvenido');
          this.router.navigate(['/nodejs-api']);
        },
        (error) => {
          console.error('Login failed', error);
          this.loginError = 'Email o contraseña incorrectos.';
          this.toastr.error('Email o contraseña incorrectos', 'Error');
        }
      );
    } else {
      this.loginError = 'Por favor, complete el formulario correctamente.';
      this.toastr.error('Por favor, complete el formulario correctamente', 'Error');
    }
  }

}
