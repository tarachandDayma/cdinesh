import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { ResetPasswordModel } from '../../models/resetpassword.model';
import { UserModel } from '../../models/user/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'lib-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  item: ResetPasswordModel;
  captchaImg: string;
  submited: boolean = false;
  formgroup: FormGroup;
  userModel:UserModel;
  constructor(public translate: TranslateService, private formvalidationService: FormValidationService
    , private loader: loaderserice
    , private router: Router
    , private alertService: alertserice
    , private userService: UserService) { }

  ngOnInit(): void {

    this.InitForm();
    this.loadUserData();
    this.refreshCaptch();
  }
  loadUserData(){
    this.loader.show(true);
    this.userService.LoadUserinfor().subscribe(result=>{
      this.loader.show(false);
      this.userModel=result;
      this.item= new ResetPasswordModel();
      this.item.id=this.userModel.id
    },error=>{
      this.loader.show(false);
    })
  }
  InitForm(){
    this.item= new ResetPasswordModel();
    this.formgroup = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
      captchCode: new FormControl('', Validators.required)
    });
  }
  refreshCaptch() {
    this.userService.getCaptch().subscribe(result => {
      this.captchaImg = result.imgpath
    });
  }
  
  submit() {
    this.submited = true;
    if (this.formgroup.valid) {
      this.loader.show(true);
      this.userService.ResetPassword(this.item).subscribe(result => {
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
}
