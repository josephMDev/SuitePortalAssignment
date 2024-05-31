import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserServices } from '../services/resident.services';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn = false;

    public authSecretKey = 'Bearer Token';

    constructor(private userServices: UserServices, private router: Router) {
        //this.checkLoggedIn();
    }

    // Redirect to the login page
    login(username: string, password: string): void {
        this.userServices.login(username, password).subscribe((res) => {
            const token = res.token.access_token;
            localStorage.setItem(this.authSecretKey, token);
            this.isLoggedIn = true;
            this.router.navigateByUrl('/admin');
        });
        if(!this.isLoggedIn )
            alert('Invalid username or password!');
            this.router.navigateByUrl('/login');
    }

    logout(): void {
        localStorage.removeItem(this.authSecretKey);
        this.isLoggedIn = false;
        this.router.navigateByUrl('/login');
    }

    checkLoggedIn(): boolean {
        const token = localStorage.getItem(this.authSecretKey);
        // this.userServices.refreshToken(key).subscribe((res) => {
        //     console.log(res);
        // });
        if ( token == null ) {
            this.isLoggedIn = false;
        } else {
            //const decodedToken = jwtDecode(token);
            this.isLoggedIn = !this.isTokenExpired(token);
        }
        return this.isLoggedIn;
    }

    isTokenExpired(token: string): boolean {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            return true;
        }
        return false;
    }

    isTokenValid(): boolean {
        
        const token = localStorage.getItem(this.authSecretKey);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const isExpired = this.isTokenExpired(token);
                return !isExpired;
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        return false;
    }
}
