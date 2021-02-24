import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestOfCDComponent } from './component/best-of-cd/best-of-cd.component';
import { CompanyComponent } from './component/company/company.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DiamondDetailComponent } from './component/diamond-detail/diamond-detail.component';
import { DiamondScheduleComponent } from './component/diamond-schedule/diamond-schedule.component';
import { DownloadSetupComponent } from './component/download-setup/download-setup.component';
import { InquiryDetailComponent } from './component/inquiry-detail/inquiry-detail.component';
import { MyCartComponent } from './component/my-cart/my-cart.component';
import { NewgoodsComponent } from './component/newgoods/newgoods.component';
import { PairSetupComponent } from './component/pair-setup/pair-setup.component';
import { PersonalDetailComponent } from './component/personal-detail/personal-detail.component';
import { RecommendedComponent } from './component/recommended/recommended.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { RoleAccessModuleComponent } from './component/role-access-module/role-access-module.component';
import { RolesComponent } from './component/roles/roles.component';
import { SaveSearchComponent } from './component/save-search/save-search.component';
import { SearchComponent } from './component/search/search.component';
import { UpcomingComponent } from './component/upcoming/upcoming.component';
import { UserTrackComponent } from './component/user-track/user-track.component';
import { UserWishComponent } from './component/user-wish/user-wish.component';


const routes: Routes = [
  {
      path:"",
      pathMatch:"full",
      redirectTo:"dashboard"
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path: 'search',
    component:SearchComponent
  },
  {
    path: 'fancySearch',
    component:SearchComponent
  },
  {
    path:"SearchPacket",
    component:SearchComponent
  }
  ,
  {
    path: 'upcoming',
    component:SearchComponent
  },
  {
    path: 'bestofcd',
    component:SearchComponent
  },
  {
    path: 'recommended',
    component:RecommendedComponent
  }
  ,
  {
    path: 'newgoods',
    component:SearchComponent
  },
  {
    path:"showselected",
    component:SearchComponent
  }
  ,
  {
    path:"diamondDetail",
    component:DiamondDetailComponent
  },
  {
    path:"mycart",
    component:MyCartComponent
  },{
    path:"personalDetail",
    component:PersonalDetailComponent
  },{
    path:"downloadSetup",
    component:DownloadSetupComponent
  }
  ,{
    path:"pairSetup",
    component:PairSetupComponent
  }
  ,{
    path:"changePassword",
    component:ResetPasswordComponent
  },{
    path:"saveSearch",
    component:SaveSearchComponent
  }
  ,{
    path:"myWish",
    component:UserWishComponent
  }
  ,{
    path:"schedule",
    component:DiamondScheduleComponent
  },{
    path:"inquiry",
    component:InquiryDetailComponent
  },{
    path:"track",
    component:UserTrackComponent
  },{
    path:"role",
    component:RolesComponent
  }
  ,{
    path:"roleAccess",
    component:RoleAccessModuleComponent
  },{
    path:"company",
    component:CompanyComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceAdminRoutingModule { }
