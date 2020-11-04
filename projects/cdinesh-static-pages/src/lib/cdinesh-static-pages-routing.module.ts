import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CdineshStaticPagesComponent } from './cdinesh-static-pages.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { PrivacyComponent } from './privacy/privacy.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  }, {
    path: "home",
    component: HomeComponent
  }, {
    path: "ourStory",
    component: OurStoryComponent
  },
  {
    path:"privacy",
    component:PrivacyComponent
  },
  {
    path: "test",
    component: CdineshStaticPagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
