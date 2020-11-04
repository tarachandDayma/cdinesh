import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { alertserice, EnvironmentService, loaderserice } from 'service-common';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'lib-guest-activation',
  templateUrl: './guest-activation.component.html',
  styleUrls: ['./guest-activation.component.css']
})
export class GuestActivationComponent implements OnInit {
  AppLogo: string;
  AppTitle: string;
  constructor(private environment: EnvironmentService, private loginservice: GuestService, private router: Router
    , private alertService: alertserice, private route: ActivatedRoute, private loader: loaderserice) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        try {
          var UserId = params['UserId'];

          if (UserId == undefined)
            return;
          this.loader.show(true);
          this.loginservice.verified(UserId).subscribe(result => {
            this.loader.show(false);
          }, error => {
            this.loader.show(false);
            this.alertService.Error("Error", "something went wrong");
          })
        } catch (error) {
          // this._alertserice.Error("Notification", error); this.loader.show(false);
        }
      });
  }

}
