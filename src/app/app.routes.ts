import { Routes } from '@angular/router';

export const routes: Routes = [
    //rutas
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
    {path: 'dotnet-api', loadComponent: () => import('./dotnet-api/dotnet-api.component').then(m => m.DotnetApiComponent)},
    {path: 'laravel-api', loadComponent: () => import('./laravel-api/laravel-api.component').then(m => m.LaravelApiComponent)},
    {path: 'nodejs-api', loadComponent: () => import('./nodejs-api/nodejs-api.component').then(m => m.NodejsApiComponent)},
    {path: 'python-api', loadComponent: () => import('./python-api/python-api.component').then(m => m.PythonApiComponent)},
    
];
