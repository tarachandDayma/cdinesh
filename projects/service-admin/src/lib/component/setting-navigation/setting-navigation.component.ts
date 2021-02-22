import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-setting-navigation',
  templateUrl: './setting-navigation.component.html',
  styleUrls: ['./setting-navigation.component.css']
})
export class SettingNavigationComponent implements OnInit {

  currentMenu: string;
  constructor(private router :Router) { }

  ngOnInit(): void {
    if (-1 != this.router.url.indexOf("role")) {
      this.currentMenu = "role";
    }
    setTimeout(() => {
        document.getElementById(this.currentMenu).focus();
    }, 1000);  
  }


}
