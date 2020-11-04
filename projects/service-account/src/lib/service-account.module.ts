import { NgModule, ModuleWithProviders } from '@angular/core';
import { ServiceAccountComponent } from './service-account.component';
import { ServiceAccountRoutingModule } from './service-account-route.moduel';
import { loginService } from './services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ServiceCommonModule } from 'service-common';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [ServiceAccountComponent,LoginComponent, RegisterComponent, ResetPasswordComponent],
  imports: [
    ServiceAccountRoutingModule,
    FormsModule,ReactiveFormsModule,
    TranslateModule.forChild(),
    CommonModule,
    ServiceCommonModule
  ],
  exports: [ServiceAccountComponent,LoginComponent,RegisterComponent,ResetPasswordComponent]
})
export class ServiceAccountModule { 
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: ServiceAccountModule,
        providers: [
            loginService
        ]
    };
  }
}
