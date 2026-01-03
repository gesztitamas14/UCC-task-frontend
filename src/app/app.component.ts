import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private chatService: ChatService) { }
  LoggedIn: boolean = false
  title = 'ucc-task-frontend';
  showChat = false;
  currentUser: any;
  selectedChatId: any;
  role: string = "";

  ngOnInit() {
    this.authService.loggedIn$.subscribe(status => {
      this.LoggedIn = status;
      if(this.LoggedIn){
        const uid = Number(localStorage.getItem('uid'));

        this.authService.getUserById(uid).subscribe(u => {
          this.currentUser = u;
          this.role = u.role;

          this.chatService.getOrCreateChatForUser(u.id).subscribe(chat => {
            this.selectedChatId = chat.id;
          });
        });
      }
    });
  }
}
