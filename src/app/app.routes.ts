import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    //rutas
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
    {path: 'dotnet-api', loadComponent: () => import('./dotnet-api/dotnet-api.component').then(m => m.DotnetApiComponent)},
    {path: 'dotnet-api-signup', loadComponent: () => import('./dotnet-api-signup/dotnet-api-signup.component').then(m => m.DotnetApiSignupComponent)},
    {path: 'laravel-api', loadComponent: () => import('./laravel-api/laravel-api.component').then(m => m.LaravelApiComponent)},
    {path: 'verify-email', loadComponent: () => import('./verify-email/verify-email.component').then(m => m.VerifyEmailComponent)}, {
        path: 'nodejs-api',
        loadComponent: () => import('./nodejs-api/nodejs-api.component').then(m => m.NodejsApiComponent),
        canActivate: [AuthGuard] // Protege esta ruta
      },
    {path: 'python-api', loadComponent: () => import('./python-api/python-api.component').then(m => m.PythonApiComponent)},
    {path: 'access-denied', loadComponent: () => import('./access-denied/access-denied.component').then(m => m.AccessDeniedComponent)},
    {path: '**', loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)},
];
