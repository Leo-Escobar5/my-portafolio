import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importa MatProgressSpinnerModule

@Component({
  selector: 'app-verify-email',
  standalone: true, // Marca el componente como independiente
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatProgressSpinnerModule], // Especifica los módulos necesarios
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  message: string | undefined;
  isSuccess: boolean = false;
  isError: boolean = false;
  isLoading: boolean = true; // Indicador de carga

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.apiService.verifyEmail(token).subscribe(
          response => {
            this.message = response.message;
            this.isSuccess = true;
            this.isLoading = false;
            // Opcional: Redirigir al usuario después de unos segundos
            setTimeout(() => {
              this.router.navigate(['/dotnet-api']);
            }, 3000);
          },
          error => {
            this.isError = true;
            this.isLoading = false;
            if (error.status === 400) {
              this.message = error.error.message || error.error;
            } else {
              this.message = 'Ocurrió un error al verificar el correo electrónico. Por favor, inténtalo de nuevo más tarde.';
            }
            console.error(error);
          }
        );
      } else {
        this.isError = true;
        this.isLoading = false;
        this.message = 'Token de verificación no proporcionado.';
      }
    });
  }
}
