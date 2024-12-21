import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container mt-5">
      <h1>Welcome to the Dashboard</h1>
      <p>Welcome, {{ username }}!</p>
      <button (click)="logout()" class="btn btn-danger">Logout</button>
    </div>
  `,
  // templateUrl: './login.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Ambil username dari localStorage atau session
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Guest';
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
}
