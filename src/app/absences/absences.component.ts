import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  styleUrl: '../app.component.css',
  template: `
  <h2>Absences</h2>
  @if (showUsers) {
    <h4>Select date</h4>
    <form [formGroup]="selectDateForm" (ngSubmit)="selectedDateAbsences()">
      <label>From: <input required type="date" formControlName="from"></label>
      <label>To: <input   type="date" formControlName="to"></label>
      <button type="submit">Update</button>
    </form>
    <table class="nice-table">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Absence</th>
        <th>From</th>
        <th>To</th>
      </tr>
      @for (user of absentUsers; track absentUsers.Id) {
        <tr>
          <td>{{user.FirstName}}</td>
          <td>{{user.LastName}}</td>
          <td>{{user.AbsenceDefinitionName}}
          
        </tr>
      }
    </table>
  } @else {
    <p>{{errorString}}</p>
  }
  `,
  providers: [UsersService]
})
export class AbsencesComponent {
  absentUsers: any;
  showUsers = true;
  absences: any;
  errorString = "";

  selectDateForm = new FormGroup({
    from: new FormControl(""),
    to: new FormControl(""),
  })

  constructor(private userService: UsersService) {
    
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
    this.userService.getAbsentUsers("", "").subscribe(
      data => {
        console.log('added user:', data);
        this.absentUsers = data;
      },
      error => {
        console.error('Error adding user:', error);
        this.showUsers = false;
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
  }

  title = 'Absences';

  wait(ms: number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

 selectedDateAbsences() {
  this.userService.getAbsentUsers(this.selectDateForm.value.from!, this.selectDateForm.value.to!).subscribe(
    data => {
      console.log('added user:', data);
      this.absentUsers = data;
    },
    error => {
      console.error('Error adding user:', error);
      this.showUsers = false;
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
 }
}