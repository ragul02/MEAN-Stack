import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  AuthService } from '../auth.service';
@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    isLoading = false;

    constructor(public authService: AuthService) { }
   /**
    * Login to a form  */
   onSignup(form: NgForm) { 
       if (form.invalid) {
           return false;
       }
       this.authService.createUser(form.value.emailInput, form.value.passwordInput);
    }
}
