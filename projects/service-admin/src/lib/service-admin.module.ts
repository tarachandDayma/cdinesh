import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServiceAdminComponent } from './service-admin.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ServiceAdminRoutingModule } from './service-admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { userService } from './services/user.service';
import { ServiceCommonModule } from 'service-common';
import { UserDetailComponent } from './components/user/user.detail/user.detail.component';



@NgModule({
  declarations: [ServiceAdminComponent, UserComponent, NavComponent, DashboardComponent, UserDetailComponent],
  imports: [
    ServiceAdminRoutingModule,
    FormsModule,ReactiveFormsModule,
    TranslateModule.forChild(),
    CommonModule,
    ServiceCommonModule
  ],
  exports: [ServiceAdminComponent,NavComponent,UserComponent,DashboardComponent]
})
export class ServiceAdminModule { 
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: ServiceAdminModule,
        providers: [
            userService
        ]
    };
  }
}
