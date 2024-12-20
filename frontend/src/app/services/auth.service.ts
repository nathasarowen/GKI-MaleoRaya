import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, { username, password }, { withCredentials: true });
    }

    logout(): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true });
    }

    isLoggedIn(): boolean {
        // Implementasi basic untuk mengecek status login
        return !!localStorage.getItem('user');
    }

    getRole(): string | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).role : null;
    }
}