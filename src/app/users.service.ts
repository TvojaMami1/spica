import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  token = window.localStorage.getItem("token");
  tokenObj = JSON.parse(this.token || "");

  getUsers() {
    let access = this.tokenObj.access_token;
    let bearer = this.tokenObj.token_type;
    let url = "https://api4.allhours.com/api/v1/users"
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': bearer + ' ' + access });
    return this.http.get(url, {headers});
  }
  
}