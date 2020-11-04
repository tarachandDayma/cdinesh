import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, EnvironmentService, FormValidationService, loaderserice } from 'service-common';
import { GuestRegisterModel } from '../../model/guest.register.model';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'lib-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  AppLogo: string;
  AppTitle: string;
  item: GuestRegisterModel;
  captchaImg:string;
  submited:boolean=false;
  constructor(private environment: EnvironmentService,
    private loginservice: GuestService,
    public translate: TranslateService, private formvalidationService: FormValidationService
    , private loader: loaderserice
    , private router: Router
    , private alertService: alertserice
  ) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
    translate.translations
  }
  formgroup: FormGroup;
  ngOnInit(): void {
    this.item = new GuestRegisterModel();
    this.formgroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      phoneNo: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
      captchCode:new FormControl('', Validators.required)
    });
    this.refreshCaptch();
  }
  submit() {
    this.submited=true;
    if (this.formgroup.valid) {
      this.loader.show(true);

      this.loginservice.register(this.item).subscribe(result => {
        this.loader.show(false);
        if (result.status) {
          this.alertService.success("Success",this.translate.instant(result.meesage));
          this.formgroup.reset();
        }else{
          this.alertService.Error("Error", this.translate.instant(result.meesage));
        }
      }, reject => {
        this.loader.show(false);
        this.alertService.Error("Error", "something went wrong");
        try {
          this.formvalidationService.BindServerErrors(this.formgroup, reject.error);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
  refreshCaptch(){
    this.loginservice.getCaptch().subscribe(result=>{
        this.captchaImg=result.imgpath
    });
  }
}
