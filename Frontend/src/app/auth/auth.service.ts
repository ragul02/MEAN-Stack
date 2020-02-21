import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public http: HttpClient) { }

    /** Create User (SignUp) */
    createUser(email: string, password: string) {
        const authData: AuthData = {
            email: email,
            password: password
        };
        this.http.post('http://localhost:3000/api/user/signup', authData)
        .subscribe( result => {
            console.log(result);
        });
    }
}