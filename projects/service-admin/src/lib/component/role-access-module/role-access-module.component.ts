import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderserice } from 'service-common';
import { RoleModel } from '../../models/role.model';
import { RoleModuleAccessModel } from '../../models/role.module.access.model';
import { RoleModuleAccessService } from '../../service/role.module.access.service';
import { RolesService } from '../../service/role.service';

@Component({
  selector: 'lib-role-access-module',
  templateUrl: './role-access-module.component.html',
  styleUrls: ['./role-access-module.component.css']
})
export class RoleAccessModuleComponent implements OnInit {

  constructor(private roleModuleAccessService: RoleModuleAccessService, private roleService: RolesService, private loader: loaderserice, private alertService: alertserice, public translate: TranslateService, private router: Router, private modalService: NgbModal) { }
  roles: RoleModel[] = [];
  roleList: RoleModel[] = [];
  currentRole: RoleModel;
  CurrentMode = "";
  roleModuleAccessList: RoleModuleAccessModel[] = [];
  submited: false;
  allSelected:false;
  ngOnInit(): void {
    this.loadRoles();
  }
  SelectAll(){
    if(this.roleModuleAccessList.length >0){
      this.roleModuleAccessList.forEach(element => {
        element.isActive=this.allSelected;
      });
    }
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
    this.currentRole = role;
    this.CurrentMode = "EDIT"
    this.loader.show(true);
    this.roleModuleAccessService.LoadAll(this.currentRole.id).subscribe(result => {
      this.roleModuleAccessList = result;
      this.loader.show(false);
    }, error => {
      this.loader.show(false);
    });
  }
  Update() {
    this.allSelected=false;
    this.modalService.open(this.contentDeleteConfirm, { backdrop: "static", size: "sm", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  closeMode() {
    this.CurrentMode = "";
  }
  @ViewChild("contentUpdateConfirm") contentDeleteConfirm;
  UpdateConfirm() {
    this.loader.show(true);
    this.roleModuleAccessList.forEach(element => {
      element.roleId = this.currentRole.id;
    })
    this.roleModuleAccessService.AddUpdate(this.roleModuleAccessList).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.CurrentMode = "";
        this.modalService.dismissAll();
      } else {
        this.alertService.Error(this.translate.instant("admin.roleModuleAccess.error"), "");
      }
    }, error => {
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.roleModuleAccess.error"), "");
    })
  }
}
