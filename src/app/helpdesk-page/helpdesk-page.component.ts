import { Component, OnInit } from '@angular/core';
import { HelpdeskChat } from '../models/helpdesk-chat-model';
import { HelpdeskChatService } from '../services/helpdesk-chat.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-helpdesk-page',
  templateUrl: './helpdesk-page.component.html',
  styleUrls: ['./helpdesk-page.component.scss']
})
export class HelpdeskPageComponent implements OnInit {
  chats: HelpdeskChat[] = [];
  selectedChat: HelpdeskChat | null = null;
  isHelpdesk = true;
  currentUser: any;

  columns = [
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status' },
    { key: 'lastMessage', header: 'Last Message' },
    {
      key: 'lastMessageAt',
      header: 'Last Message At',
      formatter: (v: string) => new Date(v).toLocaleString()
    }
  ];
 
  constructor(private helpdeskService: HelpdeskChatService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(status => {
      const uid = Number(localStorage.getItem('uid'));

      this.authService.getUserById(uid).subscribe(u => {
        this.currentUser = u;
      });
    });
    this.loadChats();
  }

  loadChats(): void {
    this.helpdeskService.getChats().subscribe({
      next: chats => this.chats = chats,
      error: err => console.error('error: ', err)
    });
  }

  openChat(chat: HelpdeskChat): void {
    this.helpdeskService.openChat(chat.id).subscribe({
      next: updated => {
        chat.status = updated.status;
        this.selectedChat = chat;
      }
    });
  }

  closeChat(chat: HelpdeskChat): void {
    this.helpdeskService.closeChat(chat.id).subscribe({
      next: updated => {
        chat.status = updated.status;
        if (this.selectedChat?.id === chat.id) {
          this.selectedChat = null;
        }
      }
    });
  }

}
