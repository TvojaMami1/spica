import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  //templateUrl: './app.component.html',
  styleUrl: './users.component.css',
  template: `
  <h2>Users</h2>
  @if (showUsers) {
    <form [formGroup]="userForm" (ngSubmit)="searchUser()">
      <input type="text" formControlName="fullName">
      <button type="submit">Search</button>
    </form>
    @if (userFormView) {
      <button (click)="showAll()">Clear</button>
    }
    <table class="niceTable">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
      @if (userFormView) {
        @for (item of searchUserData; track usersData.id) {
          <tr>
            <td>{{item.FirstName}}</td>
            <td>{{item.LastName}}</td>
          </tr>
        }
      } @else {
        @for (item of usersData; track usersData.id) {
          <tr>
            <td>{{item.FirstName}}</td>
            <td>{{item.LastName}}</td>
          </tr>
        }
      }
    </table>
  } @else {
    <p>The Auth Data is not correct. Return to "Settings" and try again.</p>
  }
  <button (click)="logToken()">Get Token</button>
  `,
  providers: [UsersService]
})
export class UsersComponent {
  userForm = new FormGroup({
    fullName: new FormControl(""),
  })
  userFormView = false;

  title = 'Users';
  token = window.localStorage.getItem("token");
  tokenObj = JSON.parse(this.token || "");
  users;
  showUsers = true;
  keys: any = [];
  usersData: any;
  searchUserData: any;

  constructor(private userService: UsersService) {
    this.users = this.userService.getUsers().subscribe(
      data => {
        console.log('Access Token:', data);
        this.makeUsersTable(data);
      },
      error => {
        console.error('Error fetching the access token:', error);
        this.showUsers = false;
      }
    );
  }
  
  logToken() {
    console.log(typeof this.token == "string");
    console.log(this.tokenObj);
    console.log(this.tokenObj.access_token);
    console.log(this.users);
  }

  makeUsersTable(dataArr: Object) {
    console.log(dataArr);
    this.usersData = dataArr;
    this.keys = Object.keys(dataArr);
    console.log(this.keys);
  }

  searchUser() {
    console.log("filtering");
    this.userFormView = true;
    this.searchUserData = [];
    for (let user of this.usersData) {
      //if (this.userForm.value.fullName || "" in user.FullName) {
      //  this.searchUserData.push({"FirstName": user.FirstName, "LastName": user.LastName});
      //}
      //console.log(user.FullName);
      if ((user.FullName as string).includes(this.userForm.value.fullName || "")) {
        this.searchUserData.push(user)
      }
      //console.log((user.FullName as string).includes(this.userForm.value.fullName || ""))
    }
  }

  showAll() {
    this.userFormView = false;
    this.userForm.get("fullName")?.reset();
  }
}