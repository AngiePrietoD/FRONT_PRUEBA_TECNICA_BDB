import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { LoginResponse } from '../models/app';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl : string = `${environment.URL_SERVICE}`;

  headers = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': '*'
  });

  constructor(private http: HttpClient) {}

  login(datos:any){
    return this.http.post<LoginResponse>(this.apiUrl + 'Login', JSON.stringify(datos), {headers: this.headers});
  }
}
