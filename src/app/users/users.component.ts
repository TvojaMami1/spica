import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  //templateUrl: './app.component.html',
  styleUrl: './users.component.css',
  template: `
  <h2>Users</h2>
  @if (showUsers) {
    <form>
      <input type="text">
      <button>Submit</button>
    </form>
    <table class="niceTable">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
      @for (item of usersData; track usersData.id) {
        <tr>
          <td>{{item.FirstName}}</td>
          <td>{{item.LastName}}</td>
        </tr>
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
  title = 'Users';
  token = window.localStorage.getItem("token");
  tokenObj = JSON.parse(this.token || "");
  users;
  showUsers = true;
  keys: any = [];
  usersData: any;

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
}