import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  token = window.localStorage.getItem("token");
  tokenObj = JSON.parse(this.token || "");
  access = this.tokenObj.access_token;
  bearer = this.tokenObj.token_type;

  getUsers() {
    let url = "https://api4.allhours.com/api/v1/users"
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.bearer + ' ' + this.access });
    return this.http.get(url, {headers});
  }

  addUser(first: string, last: string, email: string) {
    let url = "https://api4.allhours.com/api/v1/Users"
    const body = new URLSearchParams({
      "Id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      "FirstName": first,
      "LastName": last,
      "MiddleName": "",
      "FullName": first + " " + last,
      "BirthDate": "",
      "Address": "",
      "City": "",
      "State": "",
      "Phone": "",
      "Mobile": "",
      "Email": email,
      "Gender": "",
      "PictureUri":" ",
      "CustomId": "",
      "CustomField1": "",
      "CustomField2": "",
      "CustomField3": "",
      "CustomField4": "",
      "CustomField5": "",
      "CustomField6": "",
      "CustomField7": "",
      "CustomField8": "",
      "CustomField9": "",
      "CustomField10": "",
      "IsTimeAttendanceUser": "true",
      "IsArchived": "false",
      "HasUserAccount": "true",
      "UserAccountId": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      "UserName": "",
      "CalculationStartDate": "",
      "CalculationStopDate": "",
      "HasAssignedPin": "true",
      "SendInvite": "true"
    }).toString();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.bearer + ' ' + this.access });
    console.log(body);
    return this.http.post(url, body, {headers});
  }

  getAbsences() {
    let url = "https://api4.allhours.com/api/v1/AbsenceDefinitions";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.bearer + ' ' + this.access });
    return this.http.get(url, {headers});
  }

  getAbsentUsers() {
    let url = "https://api4.allhours.com/api/v1/Absences";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.bearer + ' ' + this.access });
    return this.http.get(url, {headers});
  }

  getAccessToken(idx: string, secretx: string) {
    const url = 'https://login.allhours.com/connect/token';
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    const body = new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': idx,
      'client_secret': secretx,
      'scope': 'api'
    }).toString();
    console.log(body);
    return this.http.post(url, body, {headers});
  }
  
}