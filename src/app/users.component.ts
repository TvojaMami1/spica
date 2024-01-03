import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  //templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
  <router-outlet />
  `
})
export class UsersComponent {
  title = 'Users';
}