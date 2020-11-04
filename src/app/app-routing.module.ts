import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/guard/auth.guard';
import { GuestGuard } from 'src/guard/guest.guard';
import { InventoryGuard } from 'src/guard/inventory.guard';
import { IsAdminGuard } from 'src/guard/is-admin.guard';
import { LoginGuard } from 'src/guard/login.guard';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { MainComponent } from './index/main.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  {path:"",redirectTo:"index",pathMatch:"full"},
  {path:"index",component:MainComponent,canActivate:[LoginGuard]},
  {path:"home",loadChildren :()=> import("cdinesh-static-pages").then(m=> m.CdineshStaticPagesModule)},
  {path:"auth",loadChildren :()=> import("service-account").then(m=> m.ServiceAccountModule),canActivate:[LoginGuard]},
  {path:"guest",loadChildren :()=> import("service-guest").then(m=> m.ServiceGuestModule),canActivate:[LoginGuard]},
  {path:"controlpanel",loadChildren :()=> import("service-admin").then(m=> m.ServiceAdminModule),canActivate:[IsAdminGuard]},
  {path:"inventory",loadChildren :()=> import("service-inventory").then(m=> m.ServiceInventoryModule),canActivate:[InventoryGuard]},
  {path:"accessdenied",component:AccessdeniedComponent},
  {path:"*",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
