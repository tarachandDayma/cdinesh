import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';



const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"dashboard"
  },
  {
    path: 'dashboard',
    component:DashboardComponent,
  },
  {
    path: 'users',
    component:UserComponent,
    data:{ModuleName:"User",Action:"View"},
    canActivate:[AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceAdminRoutingModule { }
