import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestActivationComponent } from './component/guest-activation/guest-activation.component';
import { GuestLoginComponent } from './component/guest.login/guest.login.component';
import { RegisterComponent } from './component/register/register.component';



const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path: 'login',
    component:GuestLoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'Activation',
    component:GuestActivationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class ServiceGuestRoutingModule { }
