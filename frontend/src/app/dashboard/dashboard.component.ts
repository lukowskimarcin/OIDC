import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  testCustomer() {
    this.client
      .get('http://localhost:8080/api/v1/testCustomer')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Błąd autoryzacji: Użytkownik nie jest zalogowany.');
            this.authService.refreshToken();
            return this.client.get('http://localhost:8080/api/v1/testCustomer');
          }
          return throwError(
            () => new Error('Wystąpił błąd. Spróbuj ponownie później')
          );
        }),
        retry(1) // Możesz zmienić liczbę prób, jeśli chcesz więcej niż jedną
      )
      .subscribe();
  }
  testAdmin() {
    this.client
      .get('http://localhost:8080/api/v1/testAdmin')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Błąd autoryzacji: Użytkownik nie jest zalogowany.');
            this.authService.refreshToken();
            return this.client.get('http://localhost:8080/api/v1/testAdmin');
          }
          return throwError(
            () => new Error('Wystąpił błąd. Spróbuj ponownie później')
          );
        }),
        retry(1) // Możesz zmienić liczbę prób, jeśli chcesz więcej niż jedną
      )
      .subscribe();
  }

  private authService = inject(AuthService);
  private router = inject(Router);
  private client = inject(HttpClient);

  profile: any;

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.profile = this.authService.getProfile();
    console.log(this.profile);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
