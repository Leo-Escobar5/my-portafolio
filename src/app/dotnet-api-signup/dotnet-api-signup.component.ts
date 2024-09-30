import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Importa el módulo de Datepicker
import { MatNativeDateModule } from '@angular/material/core'; // Importa el módulo de adaptador de fechas
import { MatSelectModule } from '@angular/material/select'; // Importa el módulo de Select
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-dotnet-api-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule, // Agrega MatDatepickerModule
    MatNativeDateModule, // Agrega MatNativeDateModule
    MatSelectModule, // Agrega MatSelectModule
    RouterModule,
    HttpClientModule, // Agrega HttpClientModule
  ],
  templateUrl: './dotnet-api-signup.component.html',
  styleUrls: ['./dotnet-api-signup.component.css'],
})
export class DotnetApiSignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required], // Campo de nombre de usuario
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: ['', Validators.required], // Campo de fecha de nacimiento
        gender: ['', Validators.required], // Campo de género
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Prepara los datos para enviar al backend
      const signupData = {
        Username: this.signupForm.get('username')?.value,
        FirstName: this.signupForm.get('firstName')?.value,
        LastName: this.signupForm.get('lastName')?.value,
        Email: this.signupForm.get('email')?.value,
        DateOfBirth: this.signupForm.get('dateOfBirth')?.value,
        Gender: this.signupForm.get('gender')?.value,
        PasswordHash: this.signupForm.get('password')?.value,
      };

      // Llama al servicio API para registrar al usuario
      this.apiService.registerUser(signupData).subscribe(
        (response) => {
          this.toastr.success(
            'Registro exitoso. Por favor, verifica tu correo electrónico.'
          );
          this.router.navigate(['/dotnet-api']);
        },
        (error) => {
          this.toastr.error('Error en el registro: ' + error.error);
        }
      );
    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }
}
