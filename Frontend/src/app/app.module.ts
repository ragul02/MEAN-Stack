import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatInputModule, MatCardModule, 
  MatExpansionModule,
  MatButtonModule, MatToolbarModule, MatDialogModule,
MatProgressSpinnerModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor  } from './error.interceptor';
import { ErrorComponent } from './error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  MatExpansionModule,
  MatToolbarModule,
  MatDialogModule,
  HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent
  ]
})
export class AppModule { }
