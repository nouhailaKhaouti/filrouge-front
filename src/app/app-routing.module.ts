import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './layout/user/user.component';
import { AuthComponent } from './layout/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { authGuard } from './guard/auth.guard';
import { loggedGuard } from './guard/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent

  }
,  {
    path: "dashboard",
    component: UserComponent,
    canActivate: [authGuard] 
    },
  {
    path: "auth",
    component: AuthComponent,
    canActivate: [loggedGuard] ,

    children: [
      {
        path: "login",
        component: LoginComponent
        
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
