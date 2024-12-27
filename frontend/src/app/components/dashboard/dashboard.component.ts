import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
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

  logout(): void {
    // Hapus overlay Bootstrap jika masih ada
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  
    // Lanjutkan proses logout
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }    
}
