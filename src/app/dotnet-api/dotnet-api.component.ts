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
import { Router } from '@angular/router';
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
  ],
  templateUrl: './dotnet-api.component.html',
  styleUrls: ['./dotnet-api.component.css'],
})
export class DotnetApiComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  loginError: string | null = null; // Propiedad para manejar errores de login

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService, private fb: FormBuilder,
    private authService: AuthService
  
  ) 
    {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      // redirigir a http://localhost:4200/nodejs-api
      this.router.navigate(['/nodejs-api']);
      
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Utiliza AuthService para iniciar sesión
          this.authService.login(response.token);
          // Guarda el token en localStorage o maneja según tus necesidades
          localStorage.setItem('authToken', response.token);
          //guardar userId y email y firtsName y lastName en localStorage
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('email', response.email);
          localStorage.setItem('firstName', response.firstName);
          localStorage.setItem('lastName', response.lastName);
          // Redirige al usuario o realiza otras acciones necesarias
          this.loginError = null; // Resetea el error si el login es exitoso
          //mostrar toast
          this.toastr.success('Login exitoso', 'Bienvenido');
          this.router.navigate(['/nodejs-api']);
        },
        (error) => {
          console.error('Login failed', error);
          this.loginError = 'Email o contraseña incorrectos.'; // Muestra mensaje de error
          //mostrar toast
          this.toastr.error('Email o contraseña incorrectos', 'Error');
        }
      );
    } else {
      this.loginError = 'Por favor, complete el formulario correctamente.'; // Muestra mensaje si el formulario es inválido
      //mostrar toast
      this.toastr.error('Por favor, complete el formulario correctamente', 'Error');
    }
  }

  
}
