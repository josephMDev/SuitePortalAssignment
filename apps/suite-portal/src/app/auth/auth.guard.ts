import { Injectable, inject } from '@angular/core';
//import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// export const authGuard = (): boolean => {
//     const router = inject(Router);
//     const service = inject(AuthService);

//     if (service.checkLoggedIn()) {
//         return true;
//     } else {
//         // Redirect to the login page
//         router.navigateByUrl('/login');
//         return false;
//     }
// };

@Injectable({
    providedIn: 'root'
   })
   export class AuthGuard implements CanActivate {
   
    // inject the router service to allow navigation.
    constructor(private router: Router, private service: AuthService) { }
   
    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.service.isTokenValid()) {
            return true;
        } else {
            // Redirect to the login page
            this.router.navigateByUrl('/login');
            return false;
        }
    }
   }