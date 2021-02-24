import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderserice } from 'service-common';
import { CompanyModel } from '../../models/company.model';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'lib-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private companyService: CompanyService
    , private loader: loaderserice
    , private alertService: alertserice
    , public translate: TranslateService
    , private router: Router
    , private modalService: NgbModal) { }
  companies: CompanyModel[] = [];
  companyList: CompanyModel[] = [];
  currentCompany: CompanyModel;
  CurrentMode = "";
  formGroup: FormGroup;
  submited: false;
  searchText: string = "";
  ngOnInit(): void {
    this.loadCompanies();
  }
  searchCompnies() {
    this.loadCompanies()
  }
  loadCompanies() {
    this.loader.show(true);
    this.companyService.LoadAll(this.searchText).subscribe(result => {
      this.loader.show(false);
      this.companies = result;
    }, error => {
      this.loader.show(false);
    })
    this.companyService.GetAll().subscribe(result => {
      this.companyList = result;
    }, error => {
    })
  }

  EditNode(company: CompanyModel) {
    this.CurrentMode = "ADD";
    this.currentCompany = company;
    this.formGroup = new FormGroup({
      companyName: new FormControl('', Validators.required),
      parentCompanyId: new FormControl(''),
    });

  }
  saveRole() {
    if (this.formGroup.valid) {
      this.loader.show(true);
      this.companyService.AddUpdate(this.currentCompany).subscribe(result => {
        this.loader.show(false);
        if (result.status) {
          this.alertService.success(this.translate.instant(result.message), "");
          this.CurrentMode = "";
          this.loadCompanies();
        } else {
          this.alertService.Error(this.translate.instant(result.message), "");
        }
      }, error => {
        this.loader.show(false);
        this.alertService.Error(this.translate.instant("admin.company.error"), "");
      })
    } else {
      this.alertService.Error(this.translate.instant("admin.company.error"), "");
    }
  }
  Add() {
    this.CurrentMode = "ADD";
    this.currentCompany = new CompanyModel();
    this.formGroup = new FormGroup({
      companyName: new FormControl('', Validators.required),
      parentCompanyId: new FormControl(''),
    });
  }
  closeMode() {
    this.CurrentMode = "";
  }
  companytoDelete: CompanyModel;
  RemoveNode(company: CompanyModel) {
    this.companytoDelete = company;
    this.modalService.open(this.contentDeleteConfirm, { backdrop: "static", size: "sm", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  @ViewChild("contentDeleteConfirm") contentDeleteConfirm;
  RemoveConfirm() {
    this.companyService.Remove(this.companytoDelete).subscribe(result => {
      if (result.status) {
        this.alertService.success(this.translate.instant(result.message), "");
        this.CurrentMode = "";
        this.loadCompanies();
        this.modalService.dismissAll();
      } else {
        this.alertService.Error(this.translate.instant(result.message), "");
      }
    }, error => {
      this.alertService.Error(this.translate.instant("admin.company.error"), "");
    })
  }

}
