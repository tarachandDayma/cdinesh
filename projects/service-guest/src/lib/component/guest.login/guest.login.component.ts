import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EnvironmentService, FormValidationService, loaderserice } from 'service-common';
import { GuestModel } from '../../model/guest.model';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'lib-guest.login',
  templateUrl: './guest.login.component.html',
  styleUrls: ['./guest.login.component.css']
})
export class GuestLoginComponent implements OnInit {
  AppLogo: string;
  AppTitle: string;
  item: GuestModel;
  constructor(private environment: EnvironmentService,
    private loginservice: GuestService,
    public translate: TranslateService, private formvalidationService: FormValidationService
    , private loader: loaderserice
    , private router: Router
  ) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
    translate.translations
  }
  formgroup: FormGroup;
  ngOnInit(): void {
    this.item = new GuestModel();
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
      
      this.loginservice.login(this.item).subscribe(result => {
        this.loader.show(false);
        this.environment.Authtoken=result.authenticationtoken;
        if(this.environment.returnUrl=="" || this.environment.returnUrl==undefined || this.environment.returnUrl==null ){
          return this.router.navigateByUrl("/inventory");
        }else{
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
}