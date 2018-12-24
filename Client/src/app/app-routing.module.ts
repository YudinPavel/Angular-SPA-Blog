import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { ApplicationComponent } from './application/application.component';
import { AppGuard } from './app.guard';
import { RegistrationGuard } from './registration.guard';
import { UserPageComponent } from './user-page/user-page.component';
import { SearchComponent } from './search/search.component';
import { PostPageComponent } from './post-page/post-page.component';

const routes: Routes = [
  { path: '', component: SignInComponent, canActivate: [RegistrationGuard]},
  { path: 'registration', component: RegistrationComponent, canActivate: [RegistrationGuard]},
  { path: 'app', component: ApplicationComponent, canActivate: [AppGuard]},
  { path: 'user/:id', component: UserPageComponent, canActivate: [AppGuard]},
  { path: 'search', component: SearchComponent, canActivate: [AppGuard]},
  { path: 'post/:id', component: PostPageComponent, canActivate: [AppGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppGuard, RegistrationGuard]
})
export class AppRoutingModule { }
