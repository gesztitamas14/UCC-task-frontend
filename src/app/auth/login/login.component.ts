import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    const uid = localStorage.getItem('uid');

    if (token && uid) {
      this.redirectByRole(+uid);
    }
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        this.redirectByRole(+res.user_id);
      },
      error: () => {
        this.errorMessage = 'Login failed';
      }
    });
  }

  private redirectByRole(userId: number): void {
    this.authService.getUserById(userId).subscribe({
      next: user => {
        if (user.role === 'HELP_DESK') {
          this.router.navigate(['/helpdesk']);
        } else {
          this.router.navigate(['/events']);
        }
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  openResetPassword() {
    this.router.navigate(['/reset-password']);
  }

}
