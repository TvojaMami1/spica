import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  styleUrl: '../app.component.css',
  template: `
  <h2>Auth Data</h2>
  <p>Log in to get access to the database</p>
  <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>Client ID <input type="text" formControlName="id" /></label>
      <label>Client Secret <input type="password" formControlName="secret" /></label>
      <button type="submit">Submit</button>
    </form>
  `,
  providers: [UsersService]
})

export class SettingsComponent {
  title = 'Settings';
  profileForm = new FormGroup({
    id: new FormControl(''),
    secret: new FormControl(''),
  });

  constructor(private userService: UsersService) { }

  handleSubmit() {
    let id = String(this.profileForm.value.id);
    let secret = String(this.profileForm.value.secret);
    this.userService.getAccessToken(id, secret).subscribe(
      token => {
        console.log('Access Token:', token);
        // Store the token or do something with it
        let obj = token;
        window.localStorage.setItem("token", JSON.stringify(token));
        alert("Auth data is set.")
      },
      error => {
        console.error('Error fetching the access token:', error);
        alert("Wrong auth data, try again:(")
      }
    );

    this.profileForm.reset();
  }
}