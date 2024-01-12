import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  constructor(private http: HttpClient) { }

  getAccessToken(idx: string, secretx: string) {
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
      'client_id': idx,
      'client_secret': secretx,
      'scope': 'api'
    }).toString();
    return this.http.post(url, body, {headers});
  }
}
