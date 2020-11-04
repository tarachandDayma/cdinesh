import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, EnvironmentService, FormValidationService, loaderserice } from 'service-common';
import { UserModel } from '../../models/user.model';
import { UserReferralInfo } from '../../models/userReferralInfo.model';
import { loginService } from '../../services/login.service';
declare var $: any;

@Component({
  selector: 'lib-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  item: UserModel;
  formgroup: FormGroup;
  billingStateParam: string;
  billingCityParam: string;
  shippingStateParam: string = "GetStates";
  shippingCityParam: string;
  AppLogo: string;
  AppTitle: string;
  companyName: string;
  billingCounry: string;
  shippingCounry: string;
  submited: boolean = false;
  sellerList: any[];
  captchaImg: string;
  constructor(private environment: EnvironmentService,
    public translate: TranslateService, private formvalidationService: FormValidationService
    , private loader: loaderserice
    , private router: Router
    , private loginService: loginService
    , private alertService: alertserice
    , private ngzone: NgZone) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
  }

  ngOnInit(): void {
    this.item = new UserModel();
    this.item.userReferralInfo.push(new UserReferralInfo());
    this.item.userReferralInfo.push(new UserReferralInfo());
    this.formgroup = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      companyId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      cCEmailId: new FormControl('', Validators.compose([Validators.email])),
      contactNo: new FormControl('', Validators.required),
      faxNo: new FormControl(''),
      whatsAppNo: new FormControl(''),
      skypeId: new FormControl(''),
      qQId: new FormControl(''),
      billingAddress: new FormControl('', Validators.required),
      billingCountryId: new FormControl('', Validators.required),
      billingStateId: new FormControl('', Validators.required),
      billingCityId: new FormControl('', Validators.required),
      billingZipCode: new FormControl('', Validators.required),
      shippingAddress: new FormControl('', Validators.required),
      shippingCountryId: new FormControl('', Validators.required),
      shippingStateId: new FormControl('', Validators.required),
      shippingCityId: new FormControl('', Validators.required),
      shippingZipCode: new FormControl('', Validators.required),
      gstNo: new FormControl(''),
      coBuyerName: new FormControl(''),
      website: new FormControl('', Validators.required),
      refName1: new FormControl(''),
      refcompanyName1: new FormControl(''),
      refcontactNo1: new FormControl(''),
      refName2: new FormControl(''),
      refcompanyName2: new FormControl(''),
      refcontactNo2: new FormControl(''),
      sellerId: new FormControl('', Validators.required),
      captchCode: new FormControl('', Validators.required)
    });
    this.loader.show(true);
    this.loginService.loadSellers().subscribe(result => {
      this.loader.show(false);
      this.sellerList = result;

    }, error => {
      console.error(error);
      this.loader.show(false);
    })
  }
  companyChange(data) {
    this.item.userBasicInfo.companyId = data.id;
    this.companyName = data.value;
  }
  billingCountryChange(data) {
    this.item.userAddressInfo.billingCountryId = data.id;
    this.billingCounry = data.value;
    this.billingStateParam = "&id=" + this.item.userAddressInfo.billingCountryId;
  }
  billingStateChange(data) {
    this.item.userAddressInfo.billingStateId = data.id;
    this.billingCityParam = "&id=" + this.item.userAddressInfo.billingStateId;
  }
  billingCityChange(data) {
    this.item.userAddressInfo.billingCityId = data.id;
  }
  shippingCountryChange(data) {
    this.item.userAddressInfo.shippingCountryId = data.id;
    this.shippingCounry = data.value;
    this.shippingStateParam = "&id=" + this.item.userAddressInfo.shippingCountryId;
  }
  shippingStateChange(data) {
    this.item.userAddressInfo.shippingStateId = data.id;
    this.shippingCityParam = "&id=" + this.item.userAddressInfo.shippingStateId;
  }
  shippingCityChange(data) {
    this.item.userAddressInfo.shippingCityId = data.id;
  }
  sellerChange(data) {
    this.item.sellerId = data.id;
  }
  refreshCaptch() {
    this.loginService.getCaptch().subscribe(result => {
      this.captchaImg = result.imgpath
    });
  }
  submit() {
    this.submited = true;
    if (this.formgroup.valid) {

      this.loader.show(true);
      if (this.item.userBasicInfo.companyId == null || this.item.userBasicInfo.companyId == undefined) {
        var objcompany = {
          CompanyName: this.companyName
        }
        this.loginService.addCompany(objcompany).subscribe(result => {
          this.item.userBasicInfo.companyId = result.companyId;
          this.registerUser()
        }, error => {
          this.loader.show(false);
        })
      } else {
        this.registerUser();
      }
    }
  }
  registerUser() {
    this.loginService.register(this.item).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.alertService.success("", this.translate.instant(result.message));
        this.router.navigateByUrl("/auth/login");
      } else {
        this.alertService.Error("", this.translate.instant(result.message));
      }
    }, reject => {
      this.loader.show(false);
      this.alertService.Error("", this.translate.instant("auth.register.errorMessage"));
      try {
        this.formvalidationService.BindServerErrors(this.formgroup, reject);
      } catch (error) {
        console.log(error);
      }
    });
  }
  
}
