import { Component, OnInit } from '@angular/core';
import { CdineshStaticPagesService } from '../cdinesh-static-pages.service';
import { environment } from '../environment';
import { EnvironmentService } from 'service-common';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  AppLogo: string;
  AppTitle: string;
  constructor(private environment: EnvironmentService) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
  }
  signIn: boolean = false
  ngOnInit(): void {
    this.signIn = this.environment.IsGuestLogin || this.environment.IsLogin;
  }
  signOut() {
    this.environment.logout();
  }

}
