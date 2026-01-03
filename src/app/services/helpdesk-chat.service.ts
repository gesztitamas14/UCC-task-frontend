import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HelpdeskChat } from "../models/helpdesk-chat-model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HelpdeskChatService {

  private readonly endpoint = 'http://localhost:3000/api/helpdesk/chats';

  constructor(private http: HttpClient) {}

  getChats(): Observable<HelpdeskChat[]> {
    return this.http.get<HelpdeskChat[]>(this.endpoint);
  }

  openChat(chatId: number): Observable<HelpdeskChat> {
    return this.http.patch<HelpdeskChat>(
      `${this.endpoint}/${chatId}/open`,
      {}
    );
  }

  closeChat(chatId: number): Observable<HelpdeskChat> {
    return this.http.patch<HelpdeskChat>(
      `${this.endpoint}/${chatId}/close`,
      {}
    );
  }
}
