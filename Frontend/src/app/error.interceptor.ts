import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

//Before leaving any API request angular will call this

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public matDialog: MatDialog) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.matDialog.open(ErrorComponent);
                return throwError(error); // returning observable
            })
        );
    }

}