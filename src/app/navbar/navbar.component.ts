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
    <a routerLink="/settings" routerLinkActive="active">Settings</a>
    <a routerLink="/users" routerLinkActive="active">Users</a>
    <a routerLink="/absences" routerLinkActive="active">Absences</a>
  </nav>
  `
})
export class NavbarComponent {

}
