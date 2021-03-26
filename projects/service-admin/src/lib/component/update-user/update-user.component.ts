import { Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, EnvironmentService, FormValidationService, loaderserice } from 'service-common';
import { BBPInformationModel } from '../../models/bbpInformation.model';
import { ReferralModel } from '../../models/referral.model';
import { TermsModel } from '../../models/terms.model';
import { UserModel } from '../../models/user/user.model';
import { UserDepartmentModel } from '../../models/user/userDeprtment.model';
import { UserReferralInfo } from '../../models/user/userReferralInfo.model';
import { BBpInformationService } from '../../service/bbpInformation.service';
import { TermsService } from '../../service/terms.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'lib-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, OnChanges {
  @Input()
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
  BrokerList: BBPInformationModel[] = [];
  TermsList: TermsModel[] = [];
  AddatList: number[] = [];
  constructor(private environment: EnvironmentService,
    public translate: TranslateService, private formvalidationService: FormValidationService
    , private loader: loaderserice
    , private router: Router
    , private loginService: UserService
    , private alertService: alertserice
    , private ngzone: NgZone
    , private modalService: NgbModal
    , private bbpInformationService: BBpInformationService
    , private termService: TermsService) {
    this.AppLogo = environment.logoUrl;
    this.AppTitle = environment.appTitle;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.item.userAccountInfo.termId1 = 19;
  }

  ngOnInit(): void {
    this.item = new UserModel();
    this.item.userReferralInfo.push(new UserReferralInfo());
    this.item.userReferralInfo.push(new UserReferralInfo());
    this.item.userAccountInfo.termId1 = 19;
    this.formgroup = new FormGroup({
      userName: new FormControl('', Validators.required),
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
      billingCityId: new FormControl(''),
      billingZipCode: new FormControl('', Validators.required),
      shippingAddress: new FormControl('', Validators.required),
      shippingCountryId: new FormControl('', Validators.required),
      shippingStateId: new FormControl('', Validators.required),
      shippingCityId: new FormControl(''),
      shippingZipCode: new FormControl('', Validators.required),
      gstNo: new FormControl(''),
      coBuyerName: new FormControl(''),
      website: new FormControl('', Validators.required),
      onTable: new FormControl(''),
      blackList: new FormControl(''),
      broker: new FormControl(''),
      term1: new FormControl(''),
      term2: new FormControl(''),
      term3: new FormControl(''),
      averageBuying: new FormControl(''),
      rappoWithClient: new FormControl(''),
      saleLimit: new FormControl(''),
      natureOfClient: new FormControl(''),
      memoCharge: new FormControl(''),
      percentage: new FormControl('')
    });
    this.loader.show(true);
    this.loginService.loadSellers().subscribe(result => {
      this.loader.show(false);
      this.sellerList = result;

    }, error => {
      console.error(error);
      this.loader.show(false);
    });
    this.LoadBroker();
    this.LoadTerms();
    this.LoadAddatList();
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
    if (this.item.userDepartments != null && this.item.userDepartments != undefined) {
      this.item.userDepartments.forEach(element => {
        if (element.less1 != null && element.less1 != undefined)
          element.less1 = parseFloat(element.less1.toString());
        if (element.less2 != null && element.less2 != undefined)
          element.less2 = parseFloat(element.less1.toString());
        if (element.termId != null && element.termId != undefined)
          element.termId = parseInt(element.termId.toString());
        if (element.brokerId != null && element.brokerId != undefined)
          element.brokerId = parseInt(element.brokerId.toString());
      });
      if (this.item.userAccountInfo.termId1 != null && this.item.userAccountInfo.termId1 != undefined)
        this.item.userAccountInfo.termId1 = parseInt(this.item.userAccountInfo.termId1.toString());
      if (this.item.userAccountInfo.termId2 != null && this.item.userAccountInfo.termId2 != undefined)
        this.item.userAccountInfo.termId2 = parseInt(this.item.userAccountInfo.termId2.toString());
      if (this.item.userAccountInfo.termId3 != null && this.item.userAccountInfo.termId3 != undefined)
        this.item.userAccountInfo.termId3 = parseInt(this.item.userAccountInfo.termId3.toString());
    }
    this.loginService.UpdateNew(this.item).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.alertService.success("", this.translate.instant(result.message));
        this.modalService.dismissAll();
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
  AddReference() {
    this.item.userReferralInfo.push(new UserReferralInfo());
  }
  RemoveReference(item: UserReferralInfo) {
    var referral = JSON.parse(JSON.stringify(item)) as UserReferralInfo;
    if (this.item.removedUserReferralInfo == null || this.item.removedUserReferralInfo == undefined)
      this.item.removedUserReferralInfo = [];
    this.item.removedUserReferralInfo.push(referral);
    var indx = this.item.userReferralInfo.indexOf(item);
    this.item.userReferralInfo.splice(indx, 1);
  }
  AddReferral() {
    this.item.referrals.push(new ReferralModel());
  }
  RemoveReferral(item: ReferralModel) {
    var referral = JSON.parse(JSON.stringify(item)) as ReferralModel;
    if (this.item.removedReferrals == null || this.item.removedReferrals == undefined)
      this.item.removedReferrals = [];
    this.item.removedReferrals.push(referral);
    var indx = this.item.referrals.indexOf(item);
    this.item.referrals.splice(indx, 1);
  }
  LoadBroker() {
    this.bbpInformationService.GetAll("2").subscribe(result => {
      this.BrokerList = result;
    }, error => {
    });
  }
  LoadTerms() {
    this.termService.GetAll("").subscribe(result => {
      this.TermsList = result;
    }, error => {
    })
  }
  LoadAddatList() {
    this.loginService.GetAddatList().subscribe(result => {
      this.AddatList = result;
    }, error => {
    })
  }
  Adddepartment() {
    this.item.userDepartments.push(new UserDepartmentModel());
  }
  RemoveDepartment(item: UserDepartmentModel) {
    var dept = JSON.parse(JSON.stringify(item)) as UserDepartmentModel;
    if (this.item.removedUserDepartments == null || this.item.removedUserDepartments == undefined)
      this.item.removedUserDepartments = [];
    this.item.removedUserDepartments.push(dept);
    var indx = this.item.userDepartments.indexOf(item);
    this.item.userDepartments.splice(indx, 1);
  }
  CopyShippingAddress() {
    this.item.userAddressInfo.shippingAddress = this.item.userAddressInfo.billingAddress;
    this.item.userAddressInfo.shippingCityId = this.item.userAddressInfo.billingCityId;
    this.item.userAddressInfo.shippingCountryId = this.item.userAddressInfo.billingCountryId;
    this.item.userAddressInfo.shippingStateId = this.item.userAddressInfo.billingStateId;
    this.item.userAddressInfo.shippingZipCode = this.item.userAddressInfo.billingZipCode;
  }
}
