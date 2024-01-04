import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  styleUrl: './settings.component.css',
  template: `
  <h2>Avtorizacijski podatki</h2>
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

  handleSubmit() {
    let id = String(this.profileForm.value.id);
    let secret = String(this.profileForm.value.secret);
    window.localStorage.setItem("id", id);
    window.localStorage.setItem("secret", secret);
  }
}