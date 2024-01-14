import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  styleUrl: '../app.component.css',
  template: `
  <h2>Absences</h2>
  @if (showUsers) {
    <table class="nice-table">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Absence</th>
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
    this.userService.getAbsentUsers().subscribe(
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
}