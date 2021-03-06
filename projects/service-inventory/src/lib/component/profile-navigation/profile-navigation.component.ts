import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.css']
})
export class ProfileNavigationComponent implements OnInit {
  currentMenu: string;
  constructor(private router :Router) { }

  ngOnInit(): void {
    if (-1 != this.router.url.indexOf("personalDetail")) {
      this.currentMenu = "personalDetail";
    }
    if (-1 != this.router.url.indexOf("downloadSetup")) {
      this.currentMenu = "downloadSetup";
    }
    if (-1 != this.router.url.indexOf("pairSetup")) {
      this.currentMenu = "pairSetup";
    }
    if (-1 != this.router.url.indexOf("changePassword")) {
      this.currentMenu = "changePassword";
    } 
    if (-1 != this.router.url.indexOf("saveSearch")) {
      this.currentMenu = "saveSearch";
    }
    if (-1 != this.router.url.indexOf("myWish")) {
      this.currentMenu = "myWish";
    }
    if (-1 != this.router.url.indexOf("schedule")) {
      this.currentMenu = "schedule";
    }
    if (-1 != this.router.url.indexOf("inquiry")) {
      this.currentMenu = "inquiry";
    }
    if (-1 != this.router.url.indexOf("track")) {
      this.currentMenu = "track";
    }
    setTimeout(() => {
        document.getElementById(this.currentMenu).focus();
    }, 1000);  
  }

}
