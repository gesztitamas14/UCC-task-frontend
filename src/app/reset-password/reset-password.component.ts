import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  requestReset() {
    this.authService.requestPasswordReset(this.email).subscribe({
      next: () => this.successMessage = 'Check your email to reset the password',
      error: () => this.errorMessage = 'Failed to send reset link'
    });
  }
}
