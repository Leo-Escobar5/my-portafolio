import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service'; // Importa el AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true; // Permite el acceso
    } else {
      // Redirige al usuario a la página de inicio de sesión
      return this.router.createUrlTree(['/dotnet-api']);
    }
  }
}
