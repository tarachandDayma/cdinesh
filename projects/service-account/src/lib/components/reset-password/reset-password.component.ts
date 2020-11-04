import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, EnvironmentService, FormValidationService, loaderserice } from 'service-common';
import { ResetPasswordModel } from '../../models/resetpassword.model';
import { loginService } from '../../services/login.service';

@Component({
  selector: 'lib-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  AppLogo: string;
  AppTitle: string;
  item: ResetPasswordModel;
  captchaImg: string;
  submited: boolean = false;
  constructor(private environment: EnvironmentService,
    private loginservice: loginService,
    public translate: TranslateService, private formvalidationService: FormValidationService
    , private loader: loaderserice
    , private router: Router
    , private alertService: alertserice
    , private route: ActivatedRoute
  ) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
    translate.translations
  }
  formgroup: FormGroup;
  ngOnInit(): void {
    this.item = new ResetPasswordModel();
    this.route
      .queryParams
      .subscribe(params => {
        try {
          var UserId = params['UserId'];
          this.item.id = UserId;
          if (UserId == undefined)
            return;
        } catch (error) {
          // this._alertserice.Error("Notification", error); this.loader.show(false);
        }
      });
    
    this.formgroup = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
      captchCode: new FormControl('', Validators.required)
    });
    this.refreshCaptch();
  }
  submit() {
    this.submited = true;
    if (this.formgroup.valid) {
      this.loader.show(true);
      this.loginservice.ResetPassword(this.item).subscribe(result => {
        this.loader.show(false);
        if (result.status) {
          this.alertService.success("Success", this.translate.instant(result.message));
          this.formgroup.reset();
        } else {
          this.alertService.Error("Error", this.translate.instant(result.message));
        }
      }, reject => {
        this.loader.show(false);
        this.alertService.Error("Error", this.translate.instant("auth.reset.error"));
        try {
          this.formvalidationService.BindServerErrors(this.formgroup, reject.error);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
  refreshCaptch() {
    this.loginservice.getCaptch().subscribe(result => {
      this.captchaImg = result.imgpath
    });
  }
}
