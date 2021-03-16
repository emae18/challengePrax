import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private AuthService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const user = this.AuthService.userData;
        if (user) {
            return true;
        }
        this.router.navigate(['home/login']);
        return false;
    }
}