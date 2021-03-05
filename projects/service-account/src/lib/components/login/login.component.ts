import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { alert, alertserice, EnvironmentService, FormValidationService, loaderserice } from 'service-common';
import { Router } from '@angular/router';
import { loginModel } from '../../models/login.model';
import { loginService } from '../../services/login.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  AppLogo: string;
  AppTitle: string;
  item: loginModel;
  submited: boolean = false;
  constructor(private environment: EnvironmentService,
    private loginservice: loginService,
    public translate: TranslateService, private formvalidationService: FormValidationService
    , private loader: loaderserice
    , private router: Router
    , private alertservice: alertserice
  ) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;

  }
  formgroup: FormGroup;
  ngOnInit(): void {
    this.item = new loginModel();
    this.formgroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  public IsFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).dirty;
  }

  submit() {
    if (this.formgroup.valid) {
      this.loader.show(true);
      var formdata = new FormData();
      formdata.append("client_id", this.environment.clientId);
      formdata.append("client_secret", this.environment.ClientSecret);
      formdata.append("grant_type", this.environment.GrantType);
      formdata.append("username", this.item.username);
      formdata.append("password", this.item.password);
      formdata.append("scope", this.environment.Scope);
      this.loginservice.login(formdata).subscribe(result => {
        this.loader.show(false);
        localStorage.clear();
        this.environment.Authtoken = result.accessToken;
        if (result == null) {
          this.environment.GetModuleAcccess();
          this.alertservice.Error("", this.translate.instant("auth.login.invalidPassword"));
          return;
        } 
        if(this.environment.IsAdminLogin){
          this.environment.GetModuleAcccess();
          return this.router.navigateByUrl("/admin");
        }
        if (this.environment.returnUrl == "" || this.environment.returnUrl == undefined || this.environment.returnUrl == null) {
          this.environment.GetModuleAcccess();
          return this.router.navigateByUrl("/inventory");
        } else {
          return this.router.navigateByUrl(this.environment.returnUrl);
        }

      }, reject => {
        this.loader.show(false);
        try {
          this.formvalidationService.BindServerErrors(this.formgroup, reject);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
  forgotPassword() {
    if (this.item.username == "" || this.item.username == undefined) {
      this.submited = true;
      return;
    }
    this.loader.show(true);
    this.loginservice.forgotPassword(this.item.username).subscribe(result => {
      this.loader.show(false);
      if (result == null) {
        this.alertservice.Error("", this.translate.instant("auth.login.errorMessage"));
      } else if (result.status) {
        this.alertservice.success("", this.translate.instant(result.message));
      } else {
        this.alertservice.Error("", this.translate.instant(result.message));
      }
    }, reject => {
      this.loader.show(false);
      this.alertservice.Error("", this.translate.instant("auth.login.errorMessage"));

    });
  }
}
