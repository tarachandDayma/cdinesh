import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, NgModule } from '@angular/core';

// other imports...
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderBroadcaster } from 'service-common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: "./app-component.html",
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('1s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  public Language: string = "en";
  AppTitle: string = environment.AppTitle;
  public _hidden: boolean;
  constructor(private translate: TranslateService, private broadcat: loaderBroadcaster,private _alertService:alertserice) {
    this.LangChange(this.Language);

  }
  ngOnInit() {
    this.broadcat.on().subscribe(data => this.setDataSuccess(<boolean>data));
  }
  setDataSuccess(data: boolean): void {
    this._hidden = data;
  }
  LangChange(lang) {
    this.translate.use(lang);
    this.Language = lang;
  }
  login() {

  }

  logout() {
    // this.oidcSecurityService.logoff();
  }
}
