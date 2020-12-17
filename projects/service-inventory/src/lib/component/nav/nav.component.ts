import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  public Language: string;
  PacketNos: string = '';
  constructor(private environment: EnvironmentService, private userService: UserService, private router: Router, private translate: TranslateService) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
    this.Language = translate.currentLang;
  }

  ngOnInit(): void {
    try {
      if (-1 != this.router.url.indexOf("SearchPacket")){
        if (localStorage.getItem("PacketNo") != undefined) {
          this.PacketNos = localStorage.getItem("PacketNo");
        }
      } else {
        localStorage.setItem("PacketNo", '');
        this.PacketNos = localStorage.getItem("PacketNo");
      }
    } catch (error) {

    }
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
  LangChange(lang) {
    this.translate.use(lang);
    this.Language = lang;
  }
  SearchPackets() {
    localStorage.setItem("PacketNo", this.PacketNos)
    if (-1 !== this.router.url.indexOf("SearchPacket")) {
      location.reload();
    } else {
      this.router.navigateByUrl("/inventory/SearchPacket");
    }
  }
}
