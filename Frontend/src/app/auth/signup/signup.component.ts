import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    isLoading = false;

   /**
    * Login to a form  */
   onSignup(form: NgForm) { 
        console.log('form', form);
    }
}
