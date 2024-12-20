// app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title text-center">Login</h3>
                            <form (ngSubmit)="onSubmit()">
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="username"
                                        [(ngModel)]="username"
                                        name="username"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        class="form-control" 
                                        id="password"
                                        [(ngModel)]="password"
                                        name="password"
                                        required>
                                </div>
                                <div *ngIf="error" class="alert alert-danger">
                                    {{ error }}
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
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
                this.router.navigate(['/dashboard']);  // Pastikan rute ini sesuai dengan rute yang didefinisikan
            },
            error: (error) => {
                this.error = error.error.message || 'Terjadi kesalahan';
            }
        });
    }    
}