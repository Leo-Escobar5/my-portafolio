import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/cv/cv.pdf'; // Ruta desde 'public/assets'
    link.download = 'Leonardo_Escobar_CV.pdf';
    link.click();
  }
  
  
}
