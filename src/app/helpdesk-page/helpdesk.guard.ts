import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HelpdeskGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return of(false);
    }

    const uid = localStorage.getItem('uid');
    if (!uid) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.authService.getUserById(+uid).pipe(
      map(user => {
        if (user?.role === 'HELP_DESK') {
          return true;
        }

        this.router.navigate(['/']);
        return false;
      }),
      catchError(err => {
        console.error('user fetch error', err);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
