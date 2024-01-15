import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterLink],
  styleUrl: './app.component.css',
  template: `
  <nav>
    <span><a  routerLink="/settings" routerLinkActive="active">Settings</a></span>
    <span routerLink="/users" routerLinkActive="active"><a>Users</a></span>
    <span routerLink="/absences" routerLinkActive="active"><a>Absences</a></span>
  </nav>
  <router-outlet/>
  `
})
export class AppComponent {
  title = 'myApp';
}
