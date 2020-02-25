import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy{
    isLoading = false;
    private authStattusSub: Subscription;
    constructor(public authService: AuthService) { }

    ngOnInit() {
        this.authService.getAuthListener().subscribe(isAuthenticated => {
            this.isLoading = false;
        });
    }

    /**
     * Login to a form  */
    onSignup(form: NgForm) {
        if (form.invalid) {
            return false;
        }
        this.isLoading = true;
        this.authService.createUser(form.value.emailInput, form.value.passwordInput);
    }

    ngOnDestroy() {
        this.authStattusSub.unsubscribe();
    }
}
