import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

//Before leaving any API request angular will call this
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)  // from check-auth.js
        });
        return next.handle(authRequest);
    }

}