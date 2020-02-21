import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    isLoading = false;

    constructor(public authservice: AuthService) { }
   /**
    * Login to a form  */
    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authservice.login(form.value.emailInput, form.value.passwordInput);

        console.log('form', form);
    }
}
