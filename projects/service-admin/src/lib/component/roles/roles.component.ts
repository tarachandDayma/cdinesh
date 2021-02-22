import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loader, loaderserice } from 'service-common';
import { RoleModel } from '../../models/role.model';
import { RolesService } from '../../service/role.service';

@Component({
  selector: 'lib-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private roleService: RolesService, private loader: loaderserice, private alertService: alertserice, public translate: TranslateService, private router: Router, private modalService: NgbModal) { }
  roles: RoleModel[] = [];
  roleList: RoleModel[] = [];
  currentRole: RoleModel;
  CurrentMode = "";
  formGroup: FormGroup;
  submited: false;
  ngOnInit(): void {
    this.loadRoles();
  }
  loadRoles() {
    this.loader.show(true);
    this.roleService.LoadAll("").subscribe(result => {
      this.loader.show(false);
      this.roles = result;
    }, error => {
      this.loader.show(false);
    })
    this.roleService.GetAll().subscribe(result => {
      this.roleList = result;
    }, error => {
    })
  }

  EditNode(role: RoleModel) {
    this.CurrentMode = "ADD";
    this.currentRole = role;
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      parentRoleId: new FormControl(''),
    });

  }
  saveRole() {
    if (this.formGroup.valid) {
      this.loader.show(true);
      this.roleService.AddUpdate(this.currentRole).subscribe(result => {
        this.loader.show(false);
        if (result.status) {
          this.alertService.success(this.translate.instant(result.message), "");
          this.CurrentMode = "";
          this.loadRoles();
        } else {
          this.alertService.Error(this.translate.instant(result.message), "");
        }
      }, error => {
        this.loader.show(false);
        this.alertService.Error(this.translate.instant("admin.role.error"), "");
      })
    } else {
      this.alertService.Error(this.translate.instant("admin.role.error"), "");
    }
  }
  Add() {
    this.CurrentMode = "ADD";
    this.currentRole = new RoleModel();
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      parentRoleId: new FormControl(''),
    });
  }
  closeMode() {
    this.CurrentMode = "";
  }
  roletoDelete:RoleModel;
  RemoveNode(role: RoleModel) {
    this.roletoDelete=role;
    this.modalService.open(this.contentDeleteConfirm, { backdrop: "static", size: "sm", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  @ViewChild("contentDeleteConfirm") contentDeleteConfirm;
  RemoveConfirm(){
    this.roleService.Remove(this.roletoDelete).subscribe(result => {
      if (result.status) {
        this.alertService.success(this.translate.instant(result.message), "");
        this.CurrentMode = "";
        this.loadRoles();
        this.modalService.dismissAll();
      } else {
        this.alertService.Error(this.translate.instant(result.message), "");
      }
    }, error => {
      this.alertService.Error(this.translate.instant("admin.role.error"), "");
    })
  }
}