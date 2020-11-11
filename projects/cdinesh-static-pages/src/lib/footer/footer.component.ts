import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'service-common';

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  AppLogo: string;
  AppTitle: string;
  constructor(private environment: EnvironmentService) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
  }

  ngOnInit(): void {
  }

}
