import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestOfCDComponent } from './component/best-of-cd/best-of-cd.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DiamondDetailComponent } from './component/diamond-detail/diamond-detail.component';
import { DownloadSetupComponent } from './component/download-setup/download-setup.component';
import { MyCartComponent } from './component/my-cart/my-cart.component';
import { NewgoodsComponent } from './component/newgoods/newgoods.component';
import { PersonalDetailComponent } from './component/personal-detail/personal-detail.component';
import { RecommendedComponent } from './component/recommended/recommended.component';
import { SearchComponent } from './component/search/search.component';
import { UpcomingComponent } from './component/upcoming/upcoming.component';


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
      component:UpcomingComponent
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
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ServiceInventoryRoutingModule { }