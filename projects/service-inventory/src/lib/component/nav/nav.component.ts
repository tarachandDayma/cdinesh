import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { env } from 'process';
import { EnvironmentService } from 'service-common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'inventory-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  AppLogo: string;
  AppTitle: string;
  User: any;
  AllowControlPanel: boolean = false;
  showNaviation: boolean = true;
  currentMenu: string;
  constructor(private environment: EnvironmentService, private userService: UserService, private router: Router) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;

  }
  ngOnInit(): void {
    if (-1 != this.router.url.indexOf("dashboard")) {
      this.currentMenu = "dashboard";
    }
    if (-1 != this.router.url.indexOf("search")) {
      this.currentMenu = "search";
    }
    if (-1 != this.router.url.indexOf("fancySearch")) {
      this.currentMenu = "fancysearch";
    }
    if (-1 != this.router.url.indexOf("upcoming")) {
      this.currentMenu = "upcoming";
    }
    if (-1 != this.router.url.indexOf("bestofcd")) {
      this.currentMenu = "bestofcd";
    }
    if (-1 != this.router.url.indexOf("recommended")) {
      this.currentMenu = "recommended";
    }
    if (-1 != this.router.url.indexOf("newgoods")) {
      this.currentMenu = "newgoods";
    }
    this.AllowControlPanel = this.environment.IsAdminLogin;
    this.userService.GetUser().subscribe(result => {
      this.User = result;
    });
  }
  logout() {
    this.environment.logout();
  }
}
