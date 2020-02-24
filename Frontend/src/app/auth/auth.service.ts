import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token;
    private isAuthenticated = false;
    private AuthListener = new Subject<boolean>();
    constructor(public http: HttpClient, public router: Router) { }

    getToken() {
        return this.token;
    }
    getAuthListener() {
        return this.AuthListener.asObservable();
    }
    getIsAuth() {
        return this.isAuthenticated;
    }
    /** Create User (SignUp) */
    createUser(email: string, password: string) {
        const authData: AuthData = {
            email: email,
            password: password
        };
        this.http.post('http://localhost:3000/api/user/signup', authData)
            .subscribe(result => {
                console.log(result);
            });
    }

    login(emailId: string, password: string) {
        const authData: AuthData = {
            email: emailId,
            password: password
        };
        this.http.post<{ token: string }>('http://localhost:3000/api/user/login', authData)
            .subscribe(result => {
                const token = result.token;
                this.token = token;
                if (token) {
                    this.isAuthenticated = true;
                    this.AuthListener.next(true);
                }
            });
        this.router.navigate(['/']);
    }

    logOut() {
        this.isAuthenticated = false;
        this.token = null;
        this.AuthListener.next(false);
        this.router.navigate(['/']);
    }
}
