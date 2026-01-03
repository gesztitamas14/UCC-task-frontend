import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, timer, Subscription, switchMap, catchError, of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../models/chat-message.model';
import { Chat } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService implements OnDestroy {

  private readonly endpoint = 'http://localhost:3000/api/chat';
  private readonly chatEndpoint = 'http://localhost:3000/api/helpdesk/chats';
  private readonly POLL_MS = 3000;

  private pollSub?: Subscription;
  private lastTimestamp = '';
  private activeChatId?: number;

  private _msgs = new BehaviorSubject<ChatMessage[]>([]);
  readonly msgs$ = this._msgs.asObservable();

  constructor(private http: HttpClient) { }

  getOrCreateChatForUser(userId: number): Observable<Chat> {
    return this.http.post<Chat>(`${this.chatEndpoint}/get-or-create`, { user_id: userId });
  }
  
  closeChat(chatId: number): Observable<any> {
    return this.http.patch(`${this.chatEndpoint}/${chatId}/close`, {});
  }

  joinChat(chatId: number): void {
    this.leave();

    this.activeChatId = chatId;
    this._msgs.next([]);
    this.lastTimestamp = new Date().toISOString();

    this.pollSub = timer(0, this.POLL_MS)
      .pipe(
        switchMap(() =>
          this.http.get<ChatMessage[]>(
            `${this.endpoint}/${chatId}`,
            { params: { since: this.lastTimestamp } }
          )
        ),
        catchError(err => {
          console.error('[Chat] poll error', err);
          return of([]);
        })
      )
      .subscribe(msgs => {
        if (!msgs.length) return;

        const sorted = msgs.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );

        const fresh = sorted.filter(
          m => new Date(m.created_at) > new Date(this.lastTimestamp)
        );

        if (!fresh.length) return;

        this._msgs.next([...this._msgs.value, ...fresh]);
        this.lastTimestamp = fresh[fresh.length - 1].created_at;
      });
  }

  loadMessagesByChat(chatId: number): void {
    this.http
      .get<ChatMessage[]>(`${this.endpoint}/${chatId}`)
      .subscribe(msgs => {
        const sorted = msgs.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );

        this._msgs.next(sorted);

        if (sorted.length) {
          this.lastTimestamp = sorted[sorted.length - 1].created_at;
        }
      });
  }

  sendToChat(
    chatId: number,
    message: string,
    role: 'USER' | 'HELP_DESK'
  ): void {
    const payload = {
      chat_id: chatId,
      sender_role: role,
      message
    };

    this.http
      .post<ChatMessage>(this.endpoint, payload)
      .subscribe(msg => {
        this._msgs.next([...this._msgs.value, msg]);
        this.lastTimestamp = msg.created_at;
      });
  }

  leave(): void {
    this.pollSub?.unsubscribe();
    this.pollSub = undefined;
    this.activeChatId = undefined;
    this._msgs.next([]);
  }

  ngOnDestroy(): void {
    this.leave();
  }


}
