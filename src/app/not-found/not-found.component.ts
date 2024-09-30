// not-found.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h1>Página no encontrada</h1>
    <p>La página que buscas no existe.</p>
    <a routerLink="/">Volver al inicio</a>
  `,
  styles: [/* estilos */]
})
export class NotFoundComponent {}
