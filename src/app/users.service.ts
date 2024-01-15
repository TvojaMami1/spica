import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    const now = new Date();
    let url = "https://api4.allhours.com/api/v1/Users"
    const body = {
      "Id": "3fa85f64-5717-4562-b3fc-2c963f66bbbb",
      "FirstName": first,
      "LastName": last,
      "MiddleName": "",
      "FullName": first + " " + last,
      "BirthDate": null,
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
      "IsTimeAttendanceUser": true,
      "IsArchived": false,
      "HasUserAccount": false,
      "UserAccountId": null,
      "UserName": null,
      "CalculationStartDate": now.toISOString(),
      "CalculationStopDate": null,
      "HasAssignedPin": true,
      "SendInvite": true
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.bearer + ' ' + this.access });
    //console.log(body);
    return this.http.post(url, JSON.stringify(body), {headers});
  }

  getAbsences() {
    let url = "https://api4.allhours.com/api/v1/AbsenceDefinitions";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.bearer + ' ' + this.access });
    return this.http.get(url, {headers});
  }

  getAbsentUsers(from: string, to:string) {
    console.log(from, to, typeof from);
    let queryParams;
    if (from == "" && to == "") {
      queryParams = new HttpParams(); 
    } else if (to == "") {
      queryParams = new HttpParams().append("dateFrom", from); 
    } else {
      queryParams = new HttpParams().append("dateFrom", from).append("dateTo", to); 
    }
    let url = "https://api4.allhours.com/api/v1/Absences";
    const headersx = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.bearer + ' ' + this.access });
    return this.http.get(url, {params: queryParams, headers: headersx});
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
    return this.http.post(url, body, {headers});
  }

  addUserAbsence(id: string, absence: string, absenceId: string, from: string, to: string) {
    let url = "https://api4.allhours.com/api/v1/Absences"
    const now = new Date();
    console.log(from, to);
    let body = {
      UserId: id,
      Timestamp: now.toISOString(),
      AbsenceDefinitionId: absenceId,
      Origin: 0,
      Comment: absence,
      PartialTimeFrom: from,
      PartialTimeTo: to,
      PartialTimeDuration: 0,
      IsPartial: true,
      OverrideHolidayAbsence: true
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.bearer + ' ' + this.access });
    let jsonBody = JSON.stringify(body);
    console.log(jsonBody);
    return this.http.post(url, jsonBody, {headers});
  }
  
}