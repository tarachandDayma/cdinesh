import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'service-common';
import { userService } from '../../services/user.service';

@Component({
  selector: 'controlpanel-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  AppLogo: string;
  AppTitle: string;
  User: any;
  constructor(private environment: EnvironmentService, private userService: userService) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
  }
  userMenu:boolean=false;
  ngOnInit(): void {
    this.userService.GetUser().subscribe(result => {
      this.User = result;
    })
    this.userMenu=this.environment.CheckModuleAccess('User','View');
  }
  logout() {
    this.environment.logout();
  }
  
  
}
