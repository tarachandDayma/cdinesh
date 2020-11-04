import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'service-common';

@Component({
  selector: 'lib-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  AppLogo:string;
  AppTitle:string;
  AppName:string;
  constructor(private environment:EnvironmentService) {
    this.AppLogo=environment.logoUrl;
    this.AppTitle=environment.appTitle;
    this.AppName=environment.AppName;
  }

  ngOnInit(): void {
  }

}
