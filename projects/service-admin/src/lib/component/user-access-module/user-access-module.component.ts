import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderserice } from 'service-common';
import { RoleModel } from '../../models/role.model';
import { RoleModuleAccessModel } from '../../models/role.module.access.model';
import { UserModuleAccessModel } from '../../models/user.module.access.model';
import { UserModel } from '../../models/user/user.model';
import { CompanyService } from '../../service/company.service';
import { RolesService } from '../../service/role.service';
import { UserModuleAccessService } from '../../service/user.module.aaccess.service';
import { UserService } from '../../service/user.service';
declare var $: any;
@Component({
  selector: 'lib-user-access-module',
  templateUrl: './user-access-module.component.html',
  styleUrls: ['./user-access-module.component.css']
})
export class UserAccessModuleComponent implements OnInit {

  constructor(private userModuleAccessService: UserModuleAccessService, private roleService: RolesService, private loader: loaderserice, private alertService: alertserice, public translate: TranslateService, private router: Router, private modalService: NgbModal, private userService: UserService) { }
  roles: RoleModel[] = [];
  userList: UserModel[] = [];
  currentRole: RoleModel;
  currentUser: UserModel;
  CurrentMode = "";
  userModuleAccessList: UserModuleAccessModel[] = [];
  submited: false;
  allSelected: false;
  searchText: string = "";
  ngOnInit(): void {
    this.searchText = "";
    this.loadRoles();
  }
  SelectAll() {
    if (this.userModuleAccessList.length > 0) {
      this.userModuleAccessList.forEach(element => {
        element.isActive = this.allSelected;
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

  }
  EditNode(role: RoleModel) {
    this.CurrentMode = "EDIT"
    this.currentRole = role;
    this.loadUser();
  }
  loadUser() {
    this.loader.show(true);
    this.userModuleAccessService.LoadUsers(this.searchText, this.currentRole.id).subscribe(result => {
      this.userList = result;
      this.doPagination();
      this.loader.show(false);
    }, error => {
      this.loader.show(false);
    });
  }
  Update() {
    this.allSelected = false;

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
    this.userModuleAccessList.forEach(element => {
      element.userId = this.currentUser.id;
    })
    this.modalService.dismissAll();
    this.userModuleAccessService.Update(this.userModuleAccessList).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.modalService.dismissAll();
      } else {
        this.alertService.Error(this.translate.instant("admin.userModuleAccess.error"), "");
      }
    }, error => {
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.userModuleAccess.error"), "");
    })
  }
  EditPermission(contentPermission: any, user: UserModel) {
    this.allSelected = false;
    this.currentUser = user;
    this.LoadUserAcccess(contentPermission);

  }
  LoadUserAcccess(contentPermission: any) {
    this.loader.show(true);
    this.userModuleAccessService.GetAccessUser(this.currentUser.id).subscribe(result => {
      this.userModuleAccessList = result;
      this.loader.show(false);
      this.modalService.open(contentPermission, { backdrop: "static", size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      }, (reason) => {
      });
    }, error => {
      this.loader.show(false);
    })
  }
  @ViewChild('div') div;
  currentPageNo: number = 0;
  PageCount: number = 0;
  Pages: any[];
  PageNos: number[] = [];
  FirstPageNo: number = 1;
  LastPageNo: number = 4;
  pressed = false;
  start: any;
  startX: any;
  startWidth: any;
  tableWidth: number;
  recordrerpage: number = 15;
  ////pagination
  doPagination() {
    this.PageCount = Math.ceil(this.userList.length / this.recordrerpage);
    var RecordNumber = 0;
    this.Pages = [];
    this.PageNos = [];
    for (var i = 0; i < this.PageCount; i++) {
      this.Pages.push(new Array());
      this.PageNos.push(i);
      var k = 0;
      for (var j = RecordNumber; j < this.userList.length; j++) {
        this.Pages[this.Pages.length - 1].push(this.userList[j]);
        RecordNumber++;
        k++;
        if (k >= this.recordrerpage) {
          break;
        }
      }
    }
    this.dataTableResizeEvent();
  }
  FirstPage(): void {
    this.currentPageNo = 0;
  }
  PrevPage(): void {
    if (this.currentPageNo > 0)
      this.currentPageNo = this.currentPageNo - 1;
  }
  NextPage(): void {
    if (this.currentPageNo < this.Pages.length - 1)
      this.currentPageNo = this.currentPageNo + 1;
  }

  LastPage(): void {
    this.currentPageNo = this.Pages.length - 1;
  }
  dataTableResizeEvent() {
    var _this = this;
    setTimeout(() => {
      $(_this.div.nativeElement).find(".cd-table").find("th").mousedown(function (e) {
        _this.start = $(this);
        _this.pressed = true;
        _this.startX = e.pageX;
        _this.startWidth = $(this).width();
        _this.tableWidth = $(_this.div.nativeElement).find(".cd-table").width();
      })
      $(document).mousemove(function (e) {
        if (_this.pressed) {
          if (_this.startWidth + (e.pageX - _this.startX) > 10) {
            $(_this.start).width(_this.startWidth + (e.pageX - _this.startX));
            var indx = $(_this.start).index();
            $.each($(_this.div.nativeElement).find(".cd-table").find("td").parent("tr").parent("tbody").find("tr"), function (index, value) {
              $(this).find("td").eq(indx).width($(_this.start).width());
            });
            // $(".cd-table").find("td").eq(indx).width($(_this.start).width());
            $(_this.div.nativeElement).find(".cd-table").find("td").eq(indx).parent("tr").parent("thead").width($(_this.start).parent("tr").parent("thead").width());
            $(_this.div.nativeElement).find(".cd-table").width(_this.tableWidth + (e.pageX - _this.startX));
          }
        }
      });
      $(document).mouseup(function () {
        if (_this.pressed) {
          _this.pressed = false;
        }
      });
      $(_this.div.nativeElement).find(".cd-table").find("th").mousemove(function (e) {
        if (!_this.pressed && e.offsetX < $(this).innerWidth() - 10) {
          $(this).css('cursor', 'pointer');

        } else if (!_this.pressed && e.offsetX > $(this).innerWidth() - 10) {
          $(this).css('cursor', 'ew-resize');

        }
      });
    }, 2000);
  }
  sortedColumn: string;
  sortDirection = 'desc';
  sort(columnName) {
    this.loader.show(true);
    var oldresult = this.userList //JSON.parse(JSON.stringify(this.searchResult));
    this.userList = [];
    if (this.sortDirection == 'desc') {
      this.sortDirection = 'asc';
      oldresult = oldresult.sort((a, b) => {
        if (a[columnName] < b[columnName]) return -1;
        else if (a[columnName] > b[columnName]) return 1;
        else return 0;
      });
    } else {
      this.sortDirection = 'desc';
      oldresult = oldresult.sort((a, b) => {
        if (a[columnName] > b[columnName]) return -1;
        else if (a[columnName] < b[columnName]) return 1;
        else return 0;
      });
    }
    this.sortedColumn = columnName;
    this.userList = oldresult;
    this.loader.show(false);
    this.doPagination();
  }
  @ViewChild("contentSearch") contentSearch;
  EditUserCriterai(user: UserModel) {
    this.allSelected = false;
    this.currentUser = user;
    this.modalService.open(this.contentSearch, { backdrop: "static", size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  @ViewChild("contentUserUpdate") contentUserUpdate;
  LoadUserUpdateModal(user: UserModel) {
    this.loader.show(true);
    this.userService.GetUserById(user.id).subscribe(result => {
      this.loader.show(false);
      this.currentUser = result;
    }, error => {
      this.loader.show(false);
    })
    this.currentUser = user;

    this.modalService.open(this.contentUserUpdate, { backdrop: "static", size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
}
