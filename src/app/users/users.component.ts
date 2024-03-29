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
  styleUrl: '../app.component.css',
  template: `
  <h2>Users</h2>
  @if (showUsers) {
    <h4>Add new user</h4>
    <form [formGroup]="addUserForm" (ngSubmit)="addUser()">
      <label>First Name: <input required type="text" formControlName="firstName"></label>
      <label>Last Name: <input required  type="text" formControlName="lastName"></label>
      <label>Email: <input required type="email" formControlName="email"></label>
      <br>
      <button type="submit">Add</button>
    </form>
    <hr>
    <h4>Add Absence</h4>
    <form [formGroup]="addAbsenceToUserForm" (ngSubmit)="addAbsenceToUser()">
      <label>First Name: <input required type="text" formControlName="firstName"></label>
      <label>Last Name: <input required  type="text" formControlName="lastName"></label>
      <label>Absence: 
        <select required type="text" formControlName="absence">
          @for (absence of absences; track absences.id) {
            <option [value]="absence.Name">{{absence.Name}}</option>
          }
        </select>
      </label>
      <label>From: <input type="datetime-local" required formControlName="from"></label>
      <label>To: <input type="datetime-local" required formControlName="to"></label>
      <button type="submit">Add</button>
    </form>
    <hr>
    <h4>Search users</h4>
    <form [formGroup]="userForm" (ngSubmit)="searchUser()">
      <label><input type="text" formControlName="fullName"></label>
      <button type="submit">Search</button>
    </form>
    @if (userFormView) {
      <button (click)="showAll()" id="clear-button">Clear</button>
    }
    <table class="nice-table">
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
    <p>{{errorString}}</p>
  }
  `,
  providers: [UsersService]
})
export class UsersComponent {
  userForm = new FormGroup({
    fullName: new FormControl(""),
  })
  userFormView = false;

  addUserForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  })

  addAbsenceToUserForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    absence: new FormControl(""),
    from: new FormControl(""),
    to: new FormControl(""),
  })

  title = 'Users';
  showUsers = true;
  errorString = "";
  usersData: any;
  searchUserData: any;
  absences: any;

  constructor(private userService: UsersService) {
    this.userService.getUsers().subscribe(
      data => {
        console.log('Access Token:', data);
        this.usersData = data;
      },
      error => {
        console.error('Error fetching the access token:', error);
        if (error.status == 401) {
          this.showUsers = false;
          this.errorString = 'The Auth Data is not correct. Return to "Settings" and try again.'
        }
        else {
          this.showUsers = false;
          this.errorString = 'Error connecting to API.'
        }
      }
    );

    this.userService.getAbsences().subscribe(
      data => {
        console.log('added user:', data);
        this.absences = data;
      },
      error => {
        console.error('Error adding user:', error);
        if (error.status == 401) {
          this.showUsers = false;
          this.errorString = 'The Auth Data is not correct. Return to "Settings" and try again.'
        }
        else {
          this.showUsers = false;
          this.errorString = 'Error connecting to API.'
        }
        this.showUsers = false;
      }
    );
  }

  addUser() {
    this.userService.addUser(this.addUserForm.value.firstName!, this.addUserForm.value.lastName!, this.addUserForm.value.email!).subscribe(
      data => {
        console.log('added user:', data);
        this.userService.getUsers().subscribe(
          data => {
            console.log('Access Token:', data);
            this.usersData = data;
          },
          error => {
            console.error('Error fetching the access token:', error);
            if (error.status == 401) {
              this.showUsers = false;
              this.errorString = 'The Auth Data is not correct. Return to "Settings" and try again.'
            }
            else {
              this.showUsers = false;
              this.errorString = 'Error connecting to API.'
            }
          }
        );
      },
      error => {
        console.error('Error adding user:', error);
        alert("User couldn't be added.")
      }
    );
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

  addAbsenceToUser() {
    let userFullName = this.addAbsenceToUserForm.value.firstName + " " + this.addAbsenceToUserForm.value.lastName;
    let userAbsenceId;
    for (let user of this.usersData) {
      if ((user.FullName as string) == userFullName) {
        userAbsenceId = user.Id;
      }
    }
    let absenceId;
    for (let absence of this.absences) {
      if(absence.Name == this.addAbsenceToUserForm.value.absence) {
        absenceId = absence.Id;
      }
    }

    this.userService.addUserAbsence(userAbsenceId, this.addAbsenceToUserForm.value.absence!, absenceId, this.addAbsenceToUserForm.value.from!, this.addAbsenceToUserForm.value.to!).subscribe(
      data => {
        console.log('added absent user:', data);

      },
      error => {
        console.error('Error adding absent user:', error);
        alert("Absence couldn't be added.");
      }
    )
  }
}