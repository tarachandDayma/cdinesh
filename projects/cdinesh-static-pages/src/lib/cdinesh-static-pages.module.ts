import { NgModule, ModuleWithProviders } from '@angular/core';
import { CdineshStaticPagesComponent } from './cdinesh-static-pages.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './cdinesh-static-pages-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CdineshStaticPagesService } from './cdinesh-static-pages.service';
import { HeaderComponent } from './header/header.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { environment } from './environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy/privacy.component';



@NgModule({
  declarations: [CdineshStaticPagesComponent,HomeComponent,NavigationComponent, HeaderComponent, OurStoryComponent, PrivacyComponent],
  imports: [
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,CommonModule,
    TranslateModule.forChild()
  ],
  providers:[],
  exports: [CdineshStaticPagesComponent]
})
export class CdineshStaticPagesModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: CdineshStaticPagesModule,
        providers: [
            CdineshStaticPagesService
        ]
    };
  }
 }
