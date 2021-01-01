import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServiceInventoryComponent } from './service-inventory.component';
import { NavComponent } from './component/nav/nav.component';
import { UserService } from './service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ServiceCommonModule } from 'service-common';
import { ServiceInventoryRoutingModule } from './service-inventory.routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NewgoodsComponent } from './component/newgoods/newgoods.component';
import { UpcomingComponent } from './component/upcoming/upcoming.component';
import { RecommendedComponent } from './component/recommended/recommended.component';
import { BestOfCDComponent } from './component/best-of-cd/best-of-cd.component';
import { SearchComponent } from './component/search/search.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DiamondDetailComponent } from './component/diamond-detail/diamond-detail.component';
import { CartService } from './service/cart.service';
import { CartBroadcaster } from './service/cartbroadcaster';
import { MyCartComponent } from './component/my-cart/my-cart.component';
import { DownloadSetupComponent } from './component/download-setup/download-setup.component';
import { ProfileNavigationComponent } from './component/profile-navigation/profile-navigation.component';
import { PersonalDetailComponent } from './component/personal-detail/personal-detail.component';
import { PairSetupComponent } from './component/pair-setup/pair-setup.component';
import { DiamondOfferComponent } from './component/diamond-offer/diamond-offer.component';
import { DiamondInquiryComponent } from './component/diamond-inquiry/diamond-inquiry.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}
@NgModule({
  declarations: [ServiceInventoryComponent, NavComponent, SearchComponent,DashboardComponent,NewgoodsComponent,UpcomingComponent,RecommendedComponent,BestOfCDComponent,DiamondDetailComponent,MyCartComponent,DownloadSetupComponent,ProfileNavigationComponent,PersonalDetailComponent,PairSetupComponent,DiamondOfferComponent,DiamondInquiryComponent,ResetPasswordComponent],
  imports: [
    FormsModule,ReactiveFormsModule,
    TranslateModule.forChild(),
    CommonModule,
    ServiceCommonModule,
    ServiceInventoryRoutingModule,
    TranslateModule.forChild({ // <--- add this code piece
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [ServiceInventoryComponent, NavComponent, SearchComponent,DashboardComponent,NewgoodsComponent,UpcomingComponent,RecommendedComponent,BestOfCDComponent,DiamondDetailComponent,MyCartComponent]
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
