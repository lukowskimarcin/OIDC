import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  testCustomer() {
    this.client.get('http://localhost:8080/api/v1/testCustomer').subscribe();
  }
  testAdmin() {
    this.client.get('http://localhost:8080/api/v1/testAdmin').subscribe();
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
