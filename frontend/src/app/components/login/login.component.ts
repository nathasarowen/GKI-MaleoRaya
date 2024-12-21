// app/components/login/login.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',  // Menunjuk ke file HTML terpisah
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit() {
        this.error = '';
        this.authService.login(this.username, this.password).subscribe({
            next: (response) => {
                localStorage.setItem('user', JSON.stringify(response));
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.error = error.error.message || 'Terjadi kesalahan';
            }
        });
    }    
}