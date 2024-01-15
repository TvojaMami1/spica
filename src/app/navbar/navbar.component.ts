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
    <a routerLink="/settings" routerLinkActive="active-link">Settings</a>
    <a routerLink="/users" routerLinkActive="active-link">Users</a>
    <a routerLink="/absences" routerLinkActive="active-link">Absences</a>
  </nav>
  `
})
export class NavbarComponent {

}
