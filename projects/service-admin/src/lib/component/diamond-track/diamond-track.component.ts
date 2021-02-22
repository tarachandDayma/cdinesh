import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { alertserice, loaderserice } from 'service-common';
import { diamondsearchResult } from '../../models/diamond.result.model';
import { DiamondTrackModel } from '../../models/diamond.track.model';
import { TrackTypeModel } from '../../models/tracktype.model';
import { DiamondTrackService } from '../../service/diamond.track.service';
import { TrackTypeService } from '../../service/track.type.service';
declare var $: any;
@Component({
  selector: 'lib-diamond-track',
  templateUrl: './diamond-track.component.html',
  styleUrls: ['./diamond-track.component.css']
})
export class DiamondTrackComponent implements OnInit, OnChanges {
  ////summary variable
  totalPcs: number;
  totalCarat: number;
  totalAvgPrice: number;
  totalAvgDisc: number;
  totalPrice: number;
  selectedtotalPcs: number;
  selectedtotalCarat: number;
  selectedtotalAvgPrice: number;
  selectedtotalAvgDisc: number;
  selectedtotalPrice: number;
  TrackTillDate: any;
  TrackType: any;
  TrackTypeList: TrackTypeModel[] = [];
  @Input("diamonds")
  diamonds: diamondsearchResult[] = [];
  constructor(private trackTypeService: TrackTypeService, private diamondTrackService: DiamondTrackService, private loader: loaderserice, private alertService: alertserice
    , public translate: TranslateService
    , private modalService: NgbModal) { }
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'trackType',
    textField: 'trackType',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };
  ngOnInit(): void {
    var d = new Date();

    var date = d.getDate();
    var month = d.getMonth() + 2;
    var year = d.getFullYear();
    this.TrackTillDate = {
      year: year,
      month: month,
      day: date
    };
    this.loader.show(true);
    this.trackTypeService.LoadAll().subscribe(result => {
      this.loader.show(false);
      this.TrackTypeList = result;
      this.TrackType = this.TrackTypeList[0].trackType;
    }, error => {
      this.loader.show(false);
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doPagination();
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
  recordrerpage: number = 200;
  ////pagination
  doPagination() {
    this.PageCount = Math.ceil(this.diamonds.length / this.recordrerpage);
    var RecordNumber = 0;
    this.Pages = [];
    this.PageNos = [];
    for (var i = 0; i < this.PageCount; i++) {
      this.Pages.push(new Array());
      this.PageNos.push(i);
      var k = 0;
      for (var j = RecordNumber; j < this.diamonds.length; j++) {
        this.Pages[this.Pages.length - 1].push(this.diamonds[j]);
        RecordNumber++;
        k++;
        if (k >= this.recordrerpage) {
          break;
        }
      }
    }
    this.calculateSummary();
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

  toggleDetail(item) {
    item.showDetail = !item.showDetail;
  }
  sortedColumn: string;
  sortDirection = 'desc';
  sort(columnName) {
    this.loader.show(true);
    var oldresult = this.diamonds //JSON.parse(JSON.stringify(this.searchResult));
    this.diamonds = [];
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
    this.diamonds = oldresult;
    this.loader.show(false);
    this.doPagination();
  }
  calculateSummary() {
    try {
      this.totalAvgDisc = 0;
      this.totalAvgPrice = 0;
      this.totalCarat = 0;
      this.totalPcs = 0;
      this.totalPrice = 0;
      this.selectedtotalAvgDisc = 0;
      this.selectedtotalAvgPrice = 0;
      this.selectedtotalCarat = 0;
      this.selectedtotalPcs = 0;
      this.selectedtotalPrice = 0;
      var TotalRapPrice = 0;
      var selectedTotalRapPrice = 0;
      this.diamonds.forEach(element => {
        this.totalPcs += 1;
        this.totalCarat += element.wt;
        this.totalPrice = this.totalPrice + (element.price * element.wt);
        TotalRapPrice = TotalRapPrice + ((element.price / ((element.back / 100) + 1)) * element.wt);

        this.selectedtotalPcs += 1;
        this.selectedtotalCarat += element.wt;
        this.selectedtotalPrice = this.selectedtotalPrice + (element._offerPrice * element.wt);
        selectedTotalRapPrice = selectedTotalRapPrice + ((element._offerPrice / ((element._offerBack / 100) + 1)) * element.wt);

      });
      this.totalAvgPrice = this.totalPrice / this.totalCarat;
      this.totalAvgDisc = (this.totalPrice / TotalRapPrice - 1) * 100;
      if (this.selectedtotalPcs > 0) {
        this.selectedtotalAvgPrice = this.selectedtotalPrice / this.selectedtotalCarat;
        this.selectedtotalAvgDisc = (this.selectedtotalPrice / selectedTotalRapPrice - 1) * 100;
      }
    } catch (error) {

    }
  }

  AddTrack() {

    var tracks: DiamondTrackModel[] = [];
    this.TrackType.forEach(ttype => {
      this.diamonds.forEach(element => {
        var track = new DiamondTrackModel();
        track.back = element.back;
        track.isActive = true;
        track.packetNo = element.packetNo;
        track.price = element.price;
        track.rapPrice = element.rapPrice;
        track.trackTillDate = new Date(this.TrackTillDate.year, this.TrackTillDate.month, this.TrackTillDate.day);
        track.trackType = ttype.trackType;
        tracks.push(track);
      });
    });
    
    this.loader.show(true);
    this.diamondTrackService.Add(tracks).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.modalService.dismissAll();
        this.alertService.success(this.translate.instant(result.message), "");
      } else {
        this.alertService.Error(this.translate.instant(result.message), "");
      }
    }, error => {
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("inventory.profile.diamondTrack.error"), "");
    })
  }
  ShowPopUp(item, flag: boolean) {
    if (!flag) {
      this.diamonds.forEach(element => {
        element.showPopUp = false;
      });
    }
    item.showPopUp = flag;
  }
  packetNo: string;
  LoadDetail(content, PacketNo: string) {
    this.packetNo = PacketNo;
    this.modalService.open(content, { size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

}
