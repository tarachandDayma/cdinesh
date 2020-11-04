import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { UserModel } from '../../../models/user.model';
import { UserReferralInfo } from '../../../models/userReferralInfo.model';
import { userService } from '../../../services/user.service';

@Component({
  selector: 'admin-user-detail',
  templateUrl: './user-detail-component.html',
  styleUrls: ['./user-detail-component.css']
})

export class UserDetailComponent implements OnInit {
  @Input() item: UserModel;
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
  @Output() savedata = new EventEmitter<any>();
  @Output() canceldata = new EventEmitter<any>();
  brokerList:UserModel[];
  constructor(private loader: loaderserice
    , private router: Router
    , private userservice: userService
    , private alertService: alertserice
    , public translate: TranslateService
    , private formvalidationService: FormValidationService
  ) { }

  ngOnInit(): void {
    this.brokerList=[];
    this.loader.show(true);
    this.userservice.GetBroker().subscribe(result=>{
      this.loader.show(false);
      this.brokerList=result; 
    },error=>{
      this.loader.show(false);
    });
    if(this.item.userReferralInfo==null || this.item.userReferralInfo==undefined || this.item.userReferralInfo.length ==0){
      this.item.userReferralInfo=[];
      this.item.userReferralInfo.push(new UserReferralInfo());
      this.item.userReferralInfo.push(new UserReferralInfo());
      this.item.userReferralInfo.push(new UserReferralInfo());
      this.item.userReferralInfo.push(new UserReferralInfo());
    }else if(this.item.userReferralInfo.length ==1){
      this.item.userReferralInfo.push(new UserReferralInfo());
      this.item.userReferralInfo.push(new UserReferralInfo());
      this.item.userReferralInfo.push(new UserReferralInfo());
    }else if(this.item.userReferralInfo.length ==2){
      this.item.userReferralInfo.push(new UserReferralInfo());
      this.item.userReferralInfo.push(new UserReferralInfo());
    }if(this.item.userReferralInfo.length ==3){
      this.item.userReferralInfo.push(new UserReferralInfo());
    }
    this.formgroup = new FormGroup({
      userName: new FormControl(this.item.userName, Validators.required),
      companyId: new FormControl(this.item.userBasicInfo.companyId, Validators.required),
      firstName: new FormControl(this.item.userBasicInfo.firstName, Validators.required),
      lastName: new FormControl(this.item.userBasicInfo.lastName, Validators.required),
      emailId: new FormControl(this.item.userBasicInfo.emailId, Validators.compose([Validators.required, Validators.email])),
      cCEmailId: new FormControl(this.item.userBasicInfo.ccEmailId, Validators.compose([Validators.email])),
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
      refcontactNo2: new FormControl(this.item.userReferralInfo[1].contactNo),
      refName3: new FormControl(this.item.userReferralInfo[2].refName),
      refcompanyName3: new FormControl(this.item.userReferralInfo[2].companyName),
      refcontactNo3: new FormControl(this.item.userReferralInfo[2].contactNo),
      refName4: new FormControl(this.item.userReferralInfo[3].refName),
      refcompanyName4: new FormControl(this.item.userReferralInfo[3].companyName),
      refcontactNo4: new FormControl(this.item.userReferralInfo[3].contactNo),
      sellerId: new FormControl(this.item.sellerId, Validators.required),
      averageBuying: new FormControl(this.item.userAccountInfo.averageBuying, Validators.pattern(/\-?\d*\.?\d{1,2}/)),
      saleLimit: new FormControl(this.item.userAccountInfo.saleLimit, Validators.pattern(/\-?\d*\.?\d{1,2}/)),
      rappoWithClient: new FormControl(this.item.userAccountInfo.rappoWithClient),
      natureOfClient: new FormControl(this.item.userAccountInfo.natureOfClient),
      onTable: new FormControl(this.item.userAccountInfo.onTable),
      paymentCycle: new FormControl(this.item.userAccountInfo.paymentCycle, Validators.pattern(/\-?\d*\.?\d{1,2}/)),
      businessRelation: new FormControl(this.item.userAccountInfo.businessRelation),
      blackList: new FormControl(this.item.userAccountInfo.blackList),
      memoCharge: new FormControl(this.item.userAccountInfo.memoCharge),
      brokerId: new FormControl(this.item.userAccountInfo.brokerId)
    });
    this.loader.show(true);
    this.userservice.loadSellers().subscribe(result => {
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
  cancel() {
    this.canceldata.emit();
  }
  submit() {
    this.submited = true;
    
    if (this.formgroup.valid) {
      this.loader.show(true);
      if (this.item.userBasicInfo.companyId == null || this.item.userBasicInfo.companyId == undefined) {
        var objcompany = {
          CompanyName: this.companyName
        }
        this.userservice.addCompany(objcompany).subscribe(result => {
          this.item.userBasicInfo.companyId = result.companyId;
          this.updateUser()
        }, error => {
          this.loader.show(false);
        })
      } else {
        this.updateUser();
      }
    }
  }
  updateUser() {
    this.userservice.update(this.item).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.alertService.success("", this.translate.instant(result.message));
        this.savedata.emit();
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
  CopyAddress(){
    this.item.userAddressInfo.shippingAddress=this.item.userAddressInfo.billingAddress;
    this.item.userAddressInfo.shippingCountryId=this.item.userAddressInfo.billingCountryId;
    this.item.userAddressInfo.shippingStateId=this.item.userAddressInfo.billingStateId;
    this.item.userAddressInfo.shippingCityId=this.item.userAddressInfo.billingCityId;
    this.item.userAddressInfo.shippingZipCode=this.item.userAddressInfo.billingZipCode;
  }
}
