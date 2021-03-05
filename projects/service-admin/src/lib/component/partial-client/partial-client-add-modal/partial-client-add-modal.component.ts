import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { UserModel } from '../../../models/user/user.model';
import { PartialClientMappingService } from '../../../service/partial.client.mapping.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'lib-partial-client-add-modal',
  templateUrl: './partial-client-add-modal.component.html',
  styleUrls: ['./partial-client-add-modal.component.css']
})
export class PartialClientAddModalComponent implements OnInit {

  constructor(
    private partialClientMappingservice: PartialClientMappingService
    , private loader: loaderserice
    , private alertService: alertserice
    , private userService: UserService
    , public translate: TranslateService
    , private formvalidationService: FormValidationService
    , private modalService: NgbModal) { }
  formgroup: FormGroup;
  item: UserModel= new UserModel();
  companyName:string;
  billingStateParam: string;
  billingCityParam: string;
  billingCounry: string;
  submited: boolean = false;
  @Input()
  seller:UserModel;  
  @Output()
  savesuccess:EventEmitter<any>= new EventEmitter<any>();  
  ngOnInit(): void {
    this.formgroup = new FormGroup({
      userName: new FormControl('', Validators.required),
      companyId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      contactNo: new FormControl('', Validators.required),
      billingAddress: new FormControl('', Validators.required),
      billingCountryId: new FormControl('', Validators.required),
      billingStateId: new FormControl('', Validators.required),
      billingCityId: new FormControl(''),
      billingZipCode: new FormControl('', Validators.required),
      gstNo: new FormControl(''),
    });
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
  submit() {
    this.submited = true;
    if (this.formgroup.valid) {

      this.loader.show(true);
      if (this.item.userBasicInfo.companyId == null || this.item.userBasicInfo.companyId == undefined) {
        var objcompany = {
          CompanyName: this.companyName
        }
        this.partialClientMappingservice.addCompany(objcompany).subscribe(result => {
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
    this.item.sellerId=this.seller.id;
    this.item.sellerEmailId=this.seller.emailId;
    this.partialClientMappingservice.AddNewUser(this.item).subscribe(result => {
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
}
