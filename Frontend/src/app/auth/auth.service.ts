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
    private tokenTimer: NodeJS.Timer;
    private userId: string;
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
    getUserId() {
        return this.userId;
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
        this.http.post<{ token: string, expiresIn: number, userId: string}>('http://localhost:3000/api/user/login', authData)
            .subscribe(result => {
                const token = result.token;
                this.token = token;
                if (token) {
                    const tokenExpiration = result.expiresIn;
                    this.setAuthTimer(tokenExpiration);
                    this.isAuthenticated = true;
                    this.AuthListener.next(true);
                    this.userId = result.userId;
                    const now = new Date();
                    const expirationTime = new Date(now.getTime() + tokenExpiration * 1000);
                    this.saveAuthData(token, expirationTime, this.userId);
                    this.router.navigate(['/']);
                }
            });
    }

    logOut() {
        this.isAuthenticated = false;
        this.token = null;
        this.AuthListener.next(false);
        clearTimeout(this.tokenTimer);
        this.userId = null;
        this.clearAuthData();
        this.router.navigate(['/']);
    }
    private setAuthTimer(duration) {
        this.tokenTimer = setTimeout(() => {
            this.logOut();
        }, duration * 1000); // setTimeout taken im milliseconds;
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        const now = new Date();
        if (!authInformation) {
            return;
        }
        // const isInFuture = authInformation.expirationDate > now;
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000); // convert to seconds
            this.AuthListener.next(true);
        }
    }
    private saveAuthData(token: string, expirationTime: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationTime.toISOString()); // convert to seria;ized date string
        localStorage.setItem('userId', userId);

    }
    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');


    }
    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');

        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        }
    }
}
