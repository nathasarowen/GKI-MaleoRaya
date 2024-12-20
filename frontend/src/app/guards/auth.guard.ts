import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.authService.isLoggedIn()) {
            // Cek role jika diperlukan
            const requiredRole = route.data['role'];
            if (requiredRole && this.authService.getRole() !== requiredRole) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}