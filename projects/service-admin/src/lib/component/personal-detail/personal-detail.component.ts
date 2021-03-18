import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { UserModel } from '../../models/user/user.model';
import { UserReferralInfo } from '../../models/user/userReferralInfo.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'lib-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent implements OnInit {
  item: UserModel;
  formgroup: FormGroup;
  billingStateParam: string;
  billingCityParam: string;
  shippingStateParam: string = "GetStates";
  shippingCityParam: string;
  companyName: string;
  billingCounry: string;
  shippingCounry: string;
  submited: boolean = false;
  constructor(private loader: loaderserice, private alertService: alertserice, private userService: UserService, public translate: TranslateService,private formvalidationService:FormValidationService) { }

  ngOnInit(): void {
    this.item= new UserModel();
    this.InitForm()
    this.LoadUserInfo();
  }
  InitForm() {
    if (this.item.userReferralInfo == undefined || this.item.userReferralInfo == null)
      this.item.userReferralInfo = [];
    if (this.item.userReferralInfo.length <= 0) {
      this.item.userReferralInfo.push(new UserReferralInfo());
    }
    if (this.item.userReferralInfo.length <= 1) {
      this.item.userReferralInfo.push(new UserReferralInfo());
    }
    this.formgroup = new FormGroup({
      firstName: new FormControl(this.item.userBasicInfo.firstName, Validators.required),
      lastName: new FormControl(this.item.userBasicInfo.lastName, Validators.required),
      emailId: new FormControl(this.item.userBasicInfo.emailId, Validators.compose([Validators.required, Validators.email])),
      cCEmailId: new FormControl(this.item.userBasicInfo.cCEmailId, Validators.compose([Validators.email])),
      contactNo: new FormControl(this.item.userBasicInfo.contactNo, Validators.required),
      faxNo: new FormControl(this.item.userBasicInfo.faxNo),
      whatsAppNo: new FormControl(this.item.userBasicInfo.whatsAppNo),
      skypeId: new FormControl(this.item.userBasicInfo.skypeId),
      qQId: new FormControl(this.item.userBasicInfo.qQId),
      billingAddress: new FormControl(this.item.userAddressInfo.billingAddress, Validators.required),
      billingCountryId: new FormControl(this.item.userAddressInfo.billingCountryId, Validators.required),
      billingStateId: new FormControl(this.item.userAddressInfo.billingStateId, Validators.required),
      billingCityId: new FormControl(this.item.userAddressInfo.billingCityId, Validators.required),
      billingZipCode: new FormControl(this.item.userAddressInfo.billingZipCode, Validators.required),
      shippingAddress: new FormControl(this.item.userAddressInfo.shippingAddress, Validators.required),
      shippingCountryId: new FormControl(this.item.userAddressInfo.shippingCountryId, Validators.required),
      shippingStateId: new FormControl(this.item.userAddressInfo.shippingStateId, Validators.required),
      shippingCityId: new FormControl(this.item.userAddressInfo.shippingCityId, Validators.required),
      shippingZipCode: new FormControl(this.item.userAddressInfo.shippingZipCode, Validators.required),
      gstNo: new FormControl(this.item.userAccountInfo.gstNo),
      coBuyerName: new FormControl(this.item.userAccountInfo.coBuyerName),
      website: new FormControl(this.item.userBasicInfo.website, Validators.required),
      refName1: new FormControl(this.item.userReferralInfo[0].refName),
      refcompanyName1: new FormControl(this.item.userReferralInfo[0].companyName),
      refcontactNo1: new FormControl(this.item.userReferralInfo[0].contactNo),
      refName2: new FormControl(this.item.userReferralInfo[1].refName),
      refcompanyName2: new FormControl(this.item.userReferralInfo[1].companyName),
      refcontactNo2: new FormControl(this.item.userReferralInfo[1].contactNo)
    });
  }
  LoadUserInfo() {
    this.loader.show(true);
    this.userService.LoadUserinfor().subscribe(result => {
      this.item = result;
      this.loader.show(false);
      this.InitForm();
    }, error => {
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.profile.userSetup.error"), "");
    })
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
  CopyBillingAddress(){
    this.item.userAddressInfo.shippingAddress=this.item.userAddressInfo.billingAddress;
    this.item.userAddressInfo.shippingCountryId=this.item.userAddressInfo.billingCountryId;
    this.item.userAddressInfo.shippingStateId=this.item.userAddressInfo.billingStateId;
    this.item.userAddressInfo.shippingCityId=this.item.userAddressInfo.billingCityId;
    this.item.userAddressInfo.shippingZipCode=this.item.userAddressInfo.billingZipCode;
  }
  Upddate() {
    this.loader.show(true);
    this.userService.Update(this.item).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.alertService.success("", this.translate.instant(result.message));
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
