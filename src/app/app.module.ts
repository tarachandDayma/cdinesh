import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// other imports...

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// imports...

//Authentication
import { GlobleService } from './globle.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CdineshStaticPagesModule } from 'cdinesh-static-pages';
import { loginService, ServiceAccountModule } from 'service-account';
import { loader, EnvironmentService, FormValidationService, RestService, ServiceCommonModule, alertserice, AltBroadcaster } from 'service-common';
import { ServiceGuestModule } from 'service-guest';
import { MainComponent } from './index/main.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartBroadcaster, CartService, ServiceInventoryModule } from 'service-inventory';
import { ServiceAdminModule } from 'service-admin';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';




export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}
// export function configureAuth(oidcConfigService: OidcConfigService) {
//   return () =>

//       oidcConfigService.withConfig({
//           stsServer: environment.authServe,
//           redirectUrl: environment.AppUrl,
//           postLogoutRedirectUri:environment.AppUrl,
//           clientId: "angular_spa",
//           scope: 'openid profile email api.read',
//           responseType: 'code',
//           silentRenew: true,
//           silentRenewUrl: `${environment.AppUrl}/silent-renew.html`,
//           logLevel: LogLevel.Debug


//       });
// }
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AccessdeniedComponent,
    NotfoundComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({ // <--- add this code piece
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceCommonModule.forRoot(),
    CdineshStaticPagesModule.forRoot(),
    ServiceAccountModule.forRoot(),
    ServiceGuestModule.forRoot(),
    ServiceInventoryModule.forRoot(),
    ServiceAdminModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      closeButton:true,
      disableTimeOut:false,
      autoDismiss:false,
      timeOut:600000
    })
  ],
  providers: [
    GlobleService
    , { provide: "Window", useValue: environment }
    , { provide: "domainid", useValue: environment.domainid }
    , EnvironmentService
    , FormValidationService
    , RestService
    , loginService
    , alertserice
    , CartBroadcaster
    , CartService
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {
  constructor() {

  }
}
