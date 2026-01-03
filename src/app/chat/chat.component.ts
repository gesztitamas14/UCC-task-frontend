import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { delay, Subscription, tap } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() currentUser: any;
  @Input() chatId!: number;
  @Input() mode: 'USER' | 'HELP_DESK' = 'USER';

  @Output() closed = new EventEmitter<void>();

  text = '';
  msgs$ = this.chatService.msgs$;

  selectedRecipientName = 'Help Desk';

  private sub = new Subscription();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    if (!this.currentUser) return;

    if (this.currentUser.role == "USER") { // otherwise chatId will be obsolete
      this.chatService.getOrCreateChatForUser(this.currentUser.id).subscribe(chat => {
        this.chatId = chat.id;
        this.loadChat();
      });
    } else { // helpdesk side
      this.loadChat();
    }

    this.sub.add(
      this.msgs$.subscribe(() =>
        setTimeout(() => this.scrollToBottom(), 100)
      )
    );
  }

  private loadChat() {
    this.chatService.joinChat(this.chatId);
    this.chatService.loadMessagesByChat(this.chatId);
  }

  ngOnDestroy(): void {
    this.chatService.leave();
    this.sub.unsubscribe();
  }

  send(): void {
    const trimmed = this.text.trim();
    if (!trimmed) return;

    this.chatService.sendToChat(
      this.chatId,
      trimmed,
      this.mode === 'HELP_DESK' ? 'HELP_DESK' : 'USER'
    );

    this.text = '';
  }

  close(): void {
    this.closed.emit();
  }

  private scrollToBottom(): void {
    try {
      const el = this.scrollContainer?.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch { }
  }

  closeChat(): void {
    if (!this.chatId || !this.currentUser) return;

    this.chatService.closeChat(this.chatId).subscribe({
      next: () => {
        this.chatService.getOrCreateChatForUser(this.currentUser.id).subscribe(chat => {
          this.chatId = chat.id;
          this.text = '';
          this.chatService.joinChat(this.chatId);
          this.chatService.loadMessagesByChat(this.chatId);
        });
      },
      error: err => console.error('Failed to close chat', err)
    });
  }
}
