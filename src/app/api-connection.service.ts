import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  constructor(private http: HttpClient) { }

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
