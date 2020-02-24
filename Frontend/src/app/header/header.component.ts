import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private authListenerSubs: Subscription;
    isuserAuthenticated = false;
    constructor(private authService: AuthService) {

    }
    ngOnInit(): void {
        this.isuserAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthListener().subscribe(authListener => {
            this.isuserAuthenticated = authListener;
        });
    }
    logOut() {
        this.authService.logOut();
    }
    ngOnDestroy() {

    }
}
