import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { PartialClientMappingModel } from '../../../models/partial.client.mapping.model';
import { UserModel } from '../../../models/user/user.model';
import { PartialClientMappingService } from '../../../service/partial.client.mapping.service';
import { UserService } from '../../../service/user.service';
declare var $ :any;
@Component({
  selector: 'lib-partial-client-mapping-modal',
  templateUrl: './partial-client-mapping-modal.component.html',
  styleUrls: ['./partial-client-mapping-modal.component.css']
})
export class PartialClientMappingModalComponent implements OnInit {

  constructor(private partialClientMappingservice: PartialClientMappingService, private loader: loaderserice, private alertService: alertserice, private userService: UserService, public translate: TranslateService, private formvalidationService: FormValidationService, private modalService:NgbModal) { }
  searchText = "";
  searchText1 = "";
  partialClient: PartialClientMappingModel;
  userList: UserModel[] = [];
  ngOnInit(): void {
    this.LoadPartilClient();

  }
  LoadPartilClient() {
    this.loader.show(true);
    this.partialClientMappingservice.Load(this.searchText).subscribe(result => {
      this.loader.show(false);
      this.partialClient=result;
      this.doPagination1();
      
    }, error => {
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.partialClientMapping.error"), "");
    })
  }
  SearchUser() {
    this.loader.show(true);
    this.partialClientMappingservice.LoadUsersAll(this.searchText1).subscribe(result => {
      this.loader.show(false);
      this.userList=result;
      this.doPagination();
    }, error => {
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.partialClientMapping.error"), "");
    })
  }
  Add(user:UserModel){
    var client:PartialClientMappingModel= new PartialClientMappingModel();
    client.clientId=user.id;
    this.loader.show(true);
    this.partialClientMappingservice.Add(client).subscribe(result=>{
      this.loader.show(false);
      if(result.status){
        this.alertService.success(this.translate.instant(result.message),"");
        this.LoadPartilClient();
        this.modalService.dismissAll();
      }else{
        this.alertService.Error(this.translate.instant(result.message),"");
      }
    },error=>{
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.partialClientMapping.error"), "");
    })
  }
  Remove(client:UserModel){
    this.loader.show(true);
    this.partialClientMappingservice.Remove(client.id).subscribe(result=>{
      this.loader.show(false);
      if(result.status){
        this.alertService.success(this.translate.instant(result.message),"");
        this.LoadPartilClient();
        this.modalService.dismissAll();
      }else{
        this.alertService.Error(this.translate.instant(result.message),"");
      }
    },error=>{
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.partialClientMapping.error"), "");
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
  recordrerpage: number = 20;
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
  @ViewChild('div1') div1;
  currentPageNo1: number = 0;
  PageCount1: number = 0;
  Pages1: any[];
  PageNos1: number[] = [];
  FirstPageNo1: number = 1;
  LastPageNo1: number = 4;
  pressed1 = false;
  start1: any;
  startX1: any;
  startWidth1: any;
  tableWidth1: number;
  recordrerpage1: number = 20;
  ////pagination
  doPagination1() {
    this.PageCount1 = Math.ceil(this.partialClient.clients.length / this.recordrerpage);
    var RecordNumber = 0;
    this.Pages1 = [];
    this.PageNos1 = [];
    for (var i = 0; i < this.PageCount1; i++) {
      this.Pages1.push(new Array());
      this.PageNos1.push(i);
      var k = 0;
      for (var j = RecordNumber; j < this.partialClient.clients.length; j++) {
        this.Pages1[this.Pages1.length - 1].push(this.partialClient.clients[j]);
        RecordNumber++;
        k++;
        if (k >= this.recordrerpage1) {
          break;
        }
      }
    }
    this.dataTableResizeEvent1();
  }
  FirstPage1(): void {
    this.currentPageNo = 0;
  }
  PrevPage1(): void {
    if (this.currentPageNo > 0)
      this.currentPageNo = this.currentPageNo - 1;
  }
  NextPage1(): void {
    if (this.currentPageNo < this.Pages.length - 1)
      this.currentPageNo = this.currentPageNo + 1;
  }

  LastPage1(): void {
    this.currentPageNo = this.Pages.length - 1;
  }
  dataTableResizeEvent1() {
    var _this = this;
    setTimeout(() => {
      $(_this.div1.nativeElement).find(".cd-table").find("th").mousedown(function (e) {
        _this.start1 = $(this);
        _this.pressed1 = true;
        _this.startX1 = e.pageX;
        _this.startWidth1 = $(this).width();
        _this.tableWidth1 = $(_this.div1.nativeElement).find(".cd-table").width();
      })
      $(document).mousemove(function (e) {
        if (_this.pressed1) {
          if (_this.startWidth1 + (e.pageX - _this.startX) > 10) {
            $(_this.start1).width(_this.startWidth1 + (e.pageX - _this.startX));
            var indx = $(_this.start1).index();
            $.each($(_this.div1.nativeElement).find(".cd-table").find("td").parent("tr").parent("tbody").find("tr"), function (index, value) {
              $(this).find("td").eq(indx).width($(_this.start1).width());
            });
            // $(".cd-table").find("td").eq(indx).width($(_this.start).width());
            $(_this.div1.nativeElement).find(".cd-table").find("td").eq(indx).parent("tr").parent("thead").width($(_this.start).parent("tr").parent("thead").width());
            $(_this.div1.nativeElement).find(".cd-table").width(_this.tableWidth1 + (e.pageX - _this.startX1));
          }
        }
      });
      $(document).mouseup(function () {
        if (_this.pressed1) {
          _this.pressed1 = false;
        }
      });
      $(_this.div1.nativeElement).find(".cd-table").find("th").mousemove(function (e) {
        if (!_this.pressed1 && e.offsetX < $(this).innerWidth() - 10) {
          $(this).css('cursor', 'pointer');

        } else if (!_this.pressed1 && e.offsetX1 > $(this).innerWidth() - 10) {
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
  sortedColumn1: string;
  sortDirection1 = 'desc';
  sort1(columnName) {
    this.loader.show(true);
    var oldresult = this.partialClient.clients //JSON.parse(JSON.stringify(this.searchResult));
    this.partialClient.clients = [];
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
    this.partialClient.clients = oldresult;
    this.loader.show(false);
    this.doPagination1();
  }
  AddPartialUser(content) {
    this.modalService.open(content, { size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  AddSucess(data){
    this.LoadPartilClient();
  }
}
