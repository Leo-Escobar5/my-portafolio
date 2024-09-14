import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      timeOut: 3000, 
      preventDuplicates: true,
      extendedTimeOut: 1000, // Tiempo de espera extendido
      tapToDismiss: true, // Permitir hacer clic para descartar
    closeButton: true, // Mostrar botón de cerrar
    progressBar: true, // Mostrar barra de progreso
    progressAnimation: 'decreasing', // Animación de la barra de progreso
    positionClass: 'toast-bottom-center', // Posición del toast
    maxOpened: 0, // Máximo número de toasts abiertos, 0 significa sin límite
    autoDismiss: false, // Descartar automáticamente cuando se alcanza el máximo
    newestOnTop: true, // Mostrar los nuevos toasts en la parte superior
    easeTime: 300, // Tiempo de facilidad para la animación de entrada
    enableHtml: false, // Habilitar HTML en el mensaje
    countDuplicates: true, // Contar duplicados
    resetTimeoutOnDuplicate: false, // No restablecer el tiempo de espera en duplicados
    easing: 'ease-in', // Tipo de easing para la animación (puede ser 'linear', 'ease', 'ease-in', 'ease-out', etc.)
    toastClass: 'ngx-toastr', // Clase CSS para el toast (puedes personalizarla)
    titleClass: 'ngx-toastr-title', // Clase CSS para el título del toast
    messageClass: 'ngx-toastr-message', // Clase CSS para el mensaje del toast
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideAnimationsAsync()]
};
