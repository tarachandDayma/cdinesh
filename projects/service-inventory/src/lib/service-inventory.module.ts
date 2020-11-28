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



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}
@NgModule({
  declarations: [ServiceInventoryComponent, NavComponent, SearchComponent,DashboardComponent,NewgoodsComponent,UpcomingComponent,RecommendedComponent,BestOfCDComponent],
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
  exports: [ServiceInventoryComponent, NavComponent, SearchComponent,DashboardComponent,NewgoodsComponent,UpcomingComponent,RecommendedComponent,BestOfCDComponent]
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
