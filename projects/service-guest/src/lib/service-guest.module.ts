import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServiceGuestComponent } from './service-guest.component';
import {  GuestLoginComponent } from './component/guest.login/guest.login.component';
import { GuestService } from './services/guest.service';
import { ServiceGuestRoutingModule } from './service-guest-routing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './component/register/register.component';
import { GuestActivationComponent } from './component/guest-activation/guest-activation.component';



@NgModule({
  declarations: [ServiceGuestComponent, GuestLoginComponent, RegisterComponent, GuestActivationComponent],
  imports: [
    ServiceGuestRoutingModule,
    FormsModule,ReactiveFormsModule,
    TranslateModule.forChild(),
    HttpClientModule,
    CommonModule
  ],
  exports: [ServiceGuestComponent,RegisterComponent]
})
export class ServiceGuestModule {
  static forRoot(): ModuleWithProviders {
    

    return {
        ngModule: ServiceGuestModule,
        providers: [
            GuestService
        ]
    };
  }
 }
