import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { ApplicationComponent } from './application/application.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserPageComponent } from './user-page/user-page.component';
import { SearchComponent } from './search/search.component';
import { PostPageComponent } from './post-page/post-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegistrationComponent,
    ApplicationComponent,
    UserPageComponent,
    SearchComponent,
    PostPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
