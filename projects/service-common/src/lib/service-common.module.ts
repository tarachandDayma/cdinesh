import { NgModule, ModuleWithProviders } from '@angular/core';
import { ServiceCommonComponent } from './service-common.component';
import { HttpClientModule } from '@angular/common/http';
import { FormValidationService } from './formvalidation.service';
import { RestService } from './rest.service';
import { ServiceCommonService } from './service-common.service';
import { EnvironmentService } from './environment.service';
import { loaderserice } from './component/loader/loaderservice';
import { loaderBroadcaster } from './component/loader/loaderbroadcast';
import { loader } from './component/loader/loaderComponent';
import { CommonModule } from '@angular/common';
import { alertserice } from './component/alert/alertservice';
import { AltBroadcaster } from './component/alert/alertbroadcast';
import { alert } from './component/alert/alertCompenent';
import { CDDropdownComponent } from './component/cddropdown/cddropdown.component';
import { DropDownService } from './services/dropdown.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdmulitselectComponent } from './component/cdmulitselect/cdmulitselect.component';
import { CdGridComponent } from './component/cd-grid/cd-grid.component';
import { CdDragDropDirective } from './directive/cd-drag-drop.directive';
import { PaginationComponent } from './component/pagination/pagination.component';



@NgModule({
  declarations: [ServiceCommonComponent, loader,alert, CDDropdownComponent, CdmulitselectComponent, CdGridComponent, CdDragDropDirective, PaginationComponent],
  imports: [
    HttpClientModule,
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  exports: [ServiceCommonComponent, loader,alert,CDDropdownComponent,CdmulitselectComponent,CdGridComponent,PaginationComponent]
})
export class ServiceCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceCommonModule,
      providers: [
        ServiceCommonService,
        EnvironmentService,
        FormValidationService,
        RestService, loaderserice, loaderBroadcaster,alertserice,AltBroadcaster,DropDownService
      ]
    };
  }
}
