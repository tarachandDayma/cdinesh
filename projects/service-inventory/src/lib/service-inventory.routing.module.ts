import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestOfCDComponent } from './component/best-of-cd/best-of-cd.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NewgoodsComponent } from './component/newgoods/newgoods.component';
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
      path: 'upcoming',
      component:UpcomingComponent
    },
    {
      path: 'bestofcd',
      component:BestOfCDComponent
    },
    {
      path: 'recommended',
      component:RecommendedComponent
    }
    ,
    {
      path: 'newgoods',
      component:NewgoodsComponent
    }

  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ServiceInventoryRoutingModule { }