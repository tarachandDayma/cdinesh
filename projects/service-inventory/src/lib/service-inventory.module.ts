import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServiceInventoryComponent } from './service-inventory.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { UserService } from './service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ServiceCommonModule } from 'service-common';
import { ServiceInventoryRoutingModule } from './service-inventory.routing.module';



@NgModule({
  declarations: [ServiceInventoryComponent, NavComponent, HomeComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    TranslateModule.forChild(),
    CommonModule,
    ServiceCommonModule,
    ServiceInventoryRoutingModule
  ],
  exports: [ServiceInventoryComponent,HomeComponent]
})
export class ServiceInventoryModule { 
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: ServiceInventoryModule,
        providers: [
            UserService
        ]
    };
  }
}
