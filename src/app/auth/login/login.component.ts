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
    if (token) {
      this.router.navigate(['/events']);
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/events']),
      error: err => this.errorMessage = 'Login failed'
    });
  }

  openResetPassword() {
    this.router.navigate(['/reset-password']);
  }

}
