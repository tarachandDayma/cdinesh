import { Component, OnInit } from '@angular/core';
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
  constructor(private environment: EnvironmentService, private userService: UserService) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
  }
  ngOnInit(): void {
    this.AllowControlPanel = this.environment.IsAdminLogin;
    this.userService.GetUser().subscribe(result => {
      this.User = result;
    })
  }
  logout() {
    this.environment.logout();
  }
}
