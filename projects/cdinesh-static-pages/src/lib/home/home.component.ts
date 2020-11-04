import { Component, OnInit } from '@angular/core';
import { CdineshStaticPagesService } from '../cdinesh-static-pages.service';
import { environment } from '../environment';
import { EnvironmentService } from 'service-common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  AppLogo:string;
  AppTitle:string;
  constructor(private environment:EnvironmentService) {
    this.AppLogo=environment.logoUrl;
    this.AppTitle=environment.appTitle;
  }

  ngOnInit(): void {
  }

}
