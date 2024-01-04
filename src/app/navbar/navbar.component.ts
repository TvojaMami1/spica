import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './navbar.component.css',
  template: `
  <nav>
    <a routerLink="/" routerLinkActive="active">Home</a>
    <a routerLink="/settings" routerLinkActive="active">Nastavitve</a>
    <a routerLink="/users" routerLinkActive="active">Uporabniki</a>
    <a routerLink="/absences" routerLinkActive="active">Odsotnosti</a>
  </nav>
  `
})
export class NavbarComponent {

}
