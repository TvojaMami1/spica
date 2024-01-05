import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { ApiConnectionService } from '../api-connection.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  styleUrl: './settings.component.css',
  template: `
  <h2>Auth Data</h2>
  <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>Client ID <input type="text" formControlName="id" /></label>
      <label>Client Secret <input type="password" formControlName="secret" /></label>
      <button type="submit">Submit</button>
    </form>
  `
})

export class SettingsComponent {
  title = 'Settings';
  profileForm = new FormGroup({
    id: new FormControl(''),
    secret: new FormControl(''),
  });

  //constructor(private apiConnectionService: ApiConnectionService) {}

  constructor(private http: HttpClient) { }

  handleSubmit() {
    let id = String(this.profileForm.value.id);
    let secret = String(this.profileForm.value.secret);
    window.localStorage.setItem("id", id);
    window.localStorage.setItem("secret", secret);
    this.getAccessToken().subscribe(
      token => {
        console.log('Access Token:', token);
        // Store the token or do something with it
        let obj = token;
        window.localStorage.setItem("token", JSON.stringify(token));
        alert("Avtorizacijski podatki nastavljeni.")
      },
      error => {
        console.error('Error fetching the access token:', error);
        alert("Napačni auth podatki:(")
      }
    );
  }

  getAccessToken() {
    const url = 'https://login.allhours.com/connect/token';
    let id = window.localStorage.getItem("id");
    if (id == null) {
      id = ""
    }
    let secret = window.localStorage.getItem("secret");
    if (secret == null) {
      secret = ""
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    const body = new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': id,
      'client_secret': secret,
      'scope': 'api'
    }).toString();
    return this.http.post(url, body, {headers});
  }
}