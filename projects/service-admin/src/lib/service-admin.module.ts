import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServiceAdminComponent } from './service-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ServiceAdminRoutingModule } from './service-admin-routing.module';
import { ServiceCommonModule } from 'service-common';
import { SearchComponent } from './component/search/search.component';
import { NewgoodsComponent } from './component/newgoods/newgoods.component';
import { UpcomingComponent } from './component/upcoming/upcoming.component';
import { RecommendedComponent } from './component/recommended/recommended.component';
import { BestOfCDComponent } from './component/best-of-cd/best-of-cd.component';
import { DiamondDetailComponent } from './component/diamond-detail/diamond-detail.component';
import { MyCartComponent } from './component/my-cart/my-cart.component';
import { ProfileNavigationComponent } from './component/profile-navigation/profile-navigation.component';
import { DownloadSetupComponent } from './component/download-setup/download-setup.component';
import { PersonalDetailComponent } from './component/personal-detail/personal-detail.component';
import { PairSetupComponent } from './component/pair-setup/pair-setup.component';
import { DiamondOfferComponent } from './component/diamond-offer/diamond-offer.component';
import { DiamondInquiryComponent } from './component/diamond-inquiry/diamond-inquiry.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { SaveSearchComponent } from './component/save-search/save-search.component';
import { UserWishComponent } from './component/user-wish/user-wish.component';
import { DiamondHoldComponent } from './component/diamond-hold/diamond-hold.component';
import { DiamondConfirmComponent } from './component/diamond-confirm/diamond-confirm.component';
import { DiamondScheduleComponent } from './component/diamond-schedule/diamond-schedule.component';
import { InquiryDetailComponent } from './component/inquiry-detail/inquiry-detail.component';
import { DiamondTrackComponent } from './component/diamond-track/diamond-track.component';
import { UserTrackComponent } from './component/user-track/user-track.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './component/nav/nav.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ServiceAdminService } from './service-admin.service';
import { TreeModule } from '@circlon/angular-tree-component';
import { SettingNavigationComponent } from './component/setting-navigation/setting-navigation.component';
import { RolesComponent } from './component/roles/roles.component';
import { RoleNodeComponent } from './component/roles/role-node/role-node.component';
import { RoleAccessModuleComponent } from './component/role-access-module/role-access-module.component';
import { RoleAccessNodeComponent } from './component/role-access-module/role-access-node/role-access-node.component';
import { CompanyComponent } from './component/company/company.component';
import { CompanyNodeComponent } from './component/company/company-node/company-node.component';
import { UserAccessModuleComponent } from './component/user-access-module/user-access-module.component';
import { UserRoleAccessNodeComponent } from './component/user-access-module/user-role-access-node/user-role-access-node.component';
import { RoleSearchComponent } from './component/role-access-module/role-search/role-search.component';
import { UserSearchComponent } from './component/user-access-module/user-search/user-search.component';
import { PartialClientComponent } from './component/partial-client/partial-client.component';
import { PartialClientMappingModalComponent } from './component/partial-client/partial-client-mapping-modal/partial-client-mapping-modal.component';
import { PartialClientAddModalComponent } from './component/partial-client/partial-client-add-modal/partial-client-add-modal.component';
import { PartialClientEditModalComponent } from './component/partial-client/partial-client-edit-modal/partial-client-edit-modal.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}
@NgModule({
  declarations: [ServiceAdminComponent, NavComponent, SearchComponent,DashboardComponent,NewgoodsComponent,UpcomingComponent,RecommendedComponent,BestOfCDComponent,DiamondDetailComponent,MyCartComponent,DownloadSetupComponent,ProfileNavigationComponent,PersonalDetailComponent,PairSetupComponent,DiamondOfferComponent,DiamondInquiryComponent,ResetPasswordComponent,SaveSearchComponent
    ,UserWishComponent,DiamondHoldComponent,DiamondConfirmComponent,DiamondScheduleComponent,InquiryDetailComponent,DiamondTrackComponent,UserTrackComponent
  ,SettingNavigationComponent,RolesComponent,RoleNodeComponent, RoleAccessModuleComponent, RoleAccessNodeComponent, CompanyComponent, CompanyNodeComponent, UserAccessModuleComponent, UserRoleAccessNodeComponent, RoleSearchComponent, UserSearchComponent, PartialClientComponent, PartialClientMappingModalComponent, PartialClientAddModalComponent, PartialClientEditModalComponent],
    imports: [
      FormsModule,ReactiveFormsModule,
      TranslateModule.forChild(),
      CommonModule,
      ServiceCommonModule,
      ServiceAdminRoutingModule,
      TranslateModule.forChild({ // <--- add this code piece
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      NgMultiSelectDropDownModule,
      NgxImageZoomModule ,
      NgbModule,
      TreeModule
    ],
  exports: [ServiceAdminComponent,NavComponent,DashboardComponent]
})
export class ServiceAdminModule { 
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: ServiceAdminModule,
        providers: [
            ServiceAdminService
        ]
    };
  }
}
