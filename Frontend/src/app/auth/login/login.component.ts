import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;
    constructor(public authService: AuthService) { }

    ngOnInit() {
        this.authStatusSub = this.authService.getAuthListener().subscribe(isAuthenticated => {
            this.isLoading = false;
        });
    }
   /**
    * Login to a form  */
    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.login(form.value.emailInput, form.value.passwordInput);

        console.log('form', form);
    }
    
    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}
