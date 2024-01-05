import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule],
  styleUrl: './app.component.css',
  template: `
  <app-navbar></app-navbar>
  <router-outlet/>
  `
})
export class AppComponent {
  title = 'myApp';
}
