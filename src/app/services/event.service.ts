import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { EventRequest } from '../models/event.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiUrl : string = `${environment.URL_SERVICE}`;

  headers = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
  });

  constructor(private http: HttpClient) {}

  createEvent(datos:any){
    return this.http.post<EventRequest[]>(this.apiUrl + 'event', JSON.stringify(datos), {headers: this.headers});
  }

  consultAll(){
    return this.http.get<EventRequest[]>(this.apiUrl + 'event', {headers: this.headers});
  }

  consultId(id:any){
    return this.http.get<EventRequest>(this.apiUrl + 'event/' + id, {headers: this.headers});
  }

  updateEvent(datos:any){
    return this.http.post<EventRequest>(this.apiUrl + 'event', JSON.stringify(datos), {headers: this.headers});;
  }

  deleteEvent(id: number): Observable<string> {
    return this.http.delete(this.apiUrl + 'event/'+id, { responseType: 'text' }) as Observable<string>;
  }
}