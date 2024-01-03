import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  //templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
  <nav>
    <a routerLink="/">Home</a>
    <a routerLink="/settings">Nastavitve</a>
    <a routerLink="/users">Uporabniki</a>
    <a routerLink="/absences">Odsotnosti</a>
  </nav>
  `
})
export class AppComponent {
  title = 'myApp';
}
