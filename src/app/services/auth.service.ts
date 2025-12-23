import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  getToken(): string | null {
    const token = localStorage.getItem('access_token');
    return token;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
}
