import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEvent } from '../models/app-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(this.apiUrl);
  }

  createEvent(event: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(this.apiUrl, event);
  }

  updateEvent(id: number, description: string): Observable<AppEvent> {
    return this.http.patch<AppEvent>(`${this.apiUrl}/${id}`, { description });
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
