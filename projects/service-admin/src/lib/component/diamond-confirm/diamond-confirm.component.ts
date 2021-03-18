import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { loaderserice, alertserice, FormValidationService, EnvironmentService } from 'service-common';
import { BBPInformationModel } from '../../models/bbpInformation.model';

import { CartModel } from '../../models/cart.model';
import { ConfirmModel } from '../../models/confirm.model';
import { diamondsearchResult } from '../../models/diamond.result.model';
import { ExportTermsMasterModel } from '../../models/exportTermsMaster.model';
import { HkTermsMasterModel } from '../../models/hkTerms.master.model';
import { MemberMasterModel } from '../../models/memberMaster.model';
import { ReferralModel } from '../../models/referral.model';
import { TermsModel } from '../../models/terms.model';
import { UserModel } from '../../models/user/user.model';
import { BBpInformationService } from '../../service/bbpInformation.service';
import { CartService } from '../../service/cart.service';
import { CartBroadcaster } from '../../service/cartbroadcaster';
import { ConfirmService } from '../../service/confirm.service';
import { DiamondCommentService } from '../../service/diamond.comment.service';
import { DownloadService } from '../../service/download.service';
import { EntityService } from '../../service/entity.service';
import { ExportTermMasterService } from '../../service/export.termsMaster.service';
import { HKExportTermMasterService } from '../../service/hkexport.termMaster.service';
import { MemberMasterService } from '../../service/membermaster.service';
import { ReferralService } from '../../service/referral.service';
import { SearchService } from '../../service/search.service';
import { TermsService } from '../../service/terms.service';
import { UserService } from '../../service/user.service';
declare var $: any;
@Component({
  selector: 'lib-diamond-confirm',
  templateUrl: './diamond-confirm.component.html',
  styleUrls: ['./diamond-confirm.component.css']
})
export class DiamondConfirmComponent implements OnInit {

  @Input("diamonds")
  diamonds: diamondsearchResult[] = [];
  @Output("closeEvent")
  closeEvent: EventEmitter<any> = new EventEmitter<any>();
  avgPrice: number;
  avgBack: number;
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
  comment: string;
  TermsId: number = 19;
  TermsList: TermsModel[] = [];
  selectedMember: MemberMasterModel;
  MemberList: MemberMasterModel[] = [];
  AddatPer: number;
  AddatList: any[] = [];
  selectedClient: UserModel;
  ClientList: UserModel[] = [];
  PartyPer1: number;
  PartyPer2: number;
  selectedReferral: ReferralModel;
  ReferralList: ReferralModel[] = [];
  BuyerList: BBPInformationModel[] = [];
  BrokerList: BBPInformationModel[] = [];
  selectedBuyer: BBPInformationModel;
  selectedBroker: BBPInformationModel;
  ExportList: ExportTermsMasterModel[] = [];
  HKLExportList: HkTermsMasterModel[] = [];
  selectedExport: number;
  selectedHKExport: number;
  hkOption: number = 0;
  BuyerPer: number;
  BrokerPer: number;
  @Output()
  onsave: EventEmitter<any> = new EventEmitter<any>();
  ////summary variable
  constructor(private loader: loaderserice
    , private router: Router
    , private alertService: alertserice
    , public translate: TranslateService
    , private formvalidationService: FormValidationService
    , private entityService: EntityService
    , private route: ActivatedRoute
    , private searchService: SearchService
    , private cartService: CartService
    , private cartBroadCaster: CartBroadcaster
    , private modalService: NgbModal
    , private downloadService: DownloadService
    , private environmentService: EnvironmentService
    , private userService: UserService
    , private diamondCommentService: DiamondCommentService
    , private confirmService: ConfirmService
    , private termservice: TermsService
    , private memberMasterService: MemberMasterService
    , private referralService: ReferralService
    , private bbpInformationService: BBpInformationService
    , private hkexportTermMasterService: HKExportTermMasterService
    , private exportTermMasterService: ExportTermMasterService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.doPagination();
  }

  ngOnInit(): void {
    this.LoadStoneStatusMessage();
    this.LoadTerms();
    this.LoadMemberPer();
    this.LoadAddat();
    this.LoadClient('');
    this.LoadExportTerm();
    this.LoadHKExportTerm();
    this.LoadBroker();
    this.LoadBuyer();
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
  AddtoCart(item: diamondsearchResult) {
    var cartItem = new CartModel();
    cartItem.back = item.back;
    cartItem.price = item.price;
    cartItem.packetNo = item.packetNo;
    cartItem.deliveryAt = item.deliveryAt;
    this.loader.show(true);
    this.cartService.Add(cartItem).subscribe(result => {
      this.loader.show(false);
      this.LoadCart();
      if (result.status) {
        this.alertService.success(this.translate.instant(result.message), "");
      } else {
        this.alertService.Error(this.translate.instant(result.message), "");
      }

    }, error => {
      this.loader.show(false);
    })
  }
  cartCount: number = 0;
  LoadCart() {
    this.cartService.GetAll().subscribe(result => {
      this.cartCount = result.length;
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
  showDetail(item) {
    localStorage.setItem("detailPacketNo", item.packetNo);
    this.router.navigate([]).then(result => { window.open("/admin/diamondDetail", '_blank'); });
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
  saveHold() {
    if (this.comment == "" || this.comment == undefined || this.comment == null) {
      this.alertService.Error(this.translate.instant("admin.confirm.comment_error"), "");
      return;
    }
    var offers: ConfirmModel[] = [];
    this.diamonds.forEach(element => {
      var offer = new ConfirmModel();
      offer.back = element.back;
      offer.comment = this.comment;
      offer.deliveryAt = element.deliveryAt;
      offer.packetNo = element.packetNo;
      offer.price = element.price;
      offers.push(offer);
    });
    var terms = this.TermsList.filter(x => x.termsId == this.TermsId)[0];
    var obj = {
      Confirms: offers,
      Diamonds: this.diamonds,
      Broker: this.selectedBroker,
      Buyer: this.selectedBuyer,
      MemberPer: this.selectedMember,
      Client: this.selectedClient,
      Referral: this.selectedReferral,
      ExportId: this.selectedExport,
      HkExportId: this.selectedHKExport,
      HkOption: this.hkOption,
      AddatPer: (this.AddatPer != undefined && this.AddatPer != null) ? parseFloat(this.AddatPer.toString()) : 0,
      PartyPer1: (this.PartyPer1 != undefined && this.PartyPer1 != null) ? parseFloat(this.PartyPer1.toString()) : 0,
      PartyPer2: (this.PartyPer2 != undefined && this.PartyPer2 != null) ? parseFloat(this.PartyPer2.toString()) : 0,
      BrokerPer: (this.BrokerPer != undefined && this.BrokerPer != null) ? parseFloat(this.BrokerPer.toString()) : 0,
      BuyerPer: (this.BuyerPer != undefined && this.BuyerPer != null) ? parseFloat(this.BuyerPer.toString()) : 0,
      Terms: (terms == null || terms == undefined) ? null : terms
    }
    this.loader.show(true);
    this.confirmService.SaveConfirm(obj).subscribe(result => {

      this.loader.show(false);
      if (result.status) {
        this.modalService.dismissAll();
        this.alertService.success(this.translate.instant("admin.confirm.success"), "");
        this.onsave.emit();
      } else {
        this.alertService.Error(this.translate.instant(result.message), "");
      }
    }, erro => {
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.confirm.error"), "");
    })
  }
  LoadStoneStatusMessage() {
    var offers: ConfirmModel[] = [];
    this.diamonds.forEach(element => {
      var offer = new ConfirmModel();
      offer.back = element.back;
      offer.comment = this.comment;
      offer.deliveryAt = element.deliveryAt;
      offer.packetNo = element.packetNo;
      offer.price = element.price;
      offers.push(offer);
    });
    
    this.confirmService.LoadMessage(offers, this.diamonds).subscribe(result => {
      if (result.message != undefined && result.message != "" && result.message != null)
        this.alertService.success(result.message, "");
    }, erro => {
    
      this.alertService.Error(this.translate.instant("admin.confirm.error"), "");
    })
  }
  LoadTerms() {
    this.termservice.GetAll("").subscribe(result => {
      this.TermsList = result;
    }, error => {
    })
  }
  LoadMemberPer() {
    this.memberMasterService.GetAll("").subscribe(result => {
      this.MemberList = result;
    }, error => {
    })
  }
  LoadAddat() {
    this.memberMasterService.GetAddat().subscribe(result => {
      this.AddatList = result;
    }, error => {
    })
  }

  LoadClient(SearchText: any) {
    this.loader.show(true);
    this.userService.GetClientList(SearchText).subscribe(result => {
      this.ClientList = [];
      this.loader.show(false);
      this.ClientList = result;
    }, error => {
      this.loader.show(false);
    })
  }
  SelectClient(item: any) {
    this.selectedClient = item;
    this.LoadReferral();
  }
  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  LoadReferral() {
    if (this.selectedClient != null && this.selectedClient != undefined) {
      this.loader.show(true);
      this.referralService.GetAll(this.selectedClient.id).subscribe(result => {
        this.loader.show(false);
        this.ReferralList = result;
      }, error => {
        this.loader.show(false);
      })
    }
  }
  LoadBroker() {
    this.bbpInformationService.GetAll("2").subscribe(result => {
      this.BrokerList = result;
    }, error => {
    })
  }
  LoadBuyer() {
    this.bbpInformationService.GetAll("1").subscribe(result => {
      this.BuyerList = result;
    }, error => {
    });
  }
  LoadExportTerm() {
    this.exportTermMasterService.LoadAll().subscribe(result => {
      this.ExportList = result;
    }, error => {
    });
  }
  LoadHKExportTerm() {
    this.hkexportTermMasterService.LoadAll().subscribe(result => {
      this.HKLExportList = result;
    }, error => {
    });
  }
  exportTermChange() {
    if (this.selectedExport != 1) {
      this.selectedHKExport = undefined;
      this.hkOption = 0;
    }
  }
  priceChange() {
    var offers: ConfirmModel[] = [];
    this.diamonds.forEach(element => {
      var offer = new ConfirmModel();
      offer.back = element.back;
      offer.comment = this.comment;
      offer.deliveryAt = element.deliveryAt;
      offer.packetNo = element.packetNo;
      offer.price = element.price;
      offers.push(offer); 
    });
    var terms = this.TermsList.filter(x => x.termsId == this.TermsId)[0];
    var obj = {
      Confirms: offers,
      Diamonds: this.diamonds,
      Broker: this.selectedBroker,
      Buyer: this.selectedBuyer,
      MemberPer: this.selectedMember,
      Client: this.selectedClient,
      Referral: this.selectedReferral,
      ExportId: this.selectedExport,
      HkExportId: this.selectedHKExport,
      HkOption: this.hkOption,
      AddatPer: (this.AddatPer != undefined && this.AddatPer != null) ? parseFloat(this.AddatPer.toString()) : 0,
      PartyPer1: (this.PartyPer1 != undefined && this.PartyPer1 != null) ? parseFloat(this.PartyPer1.toString()) : 0,
      PartyPer2: (this.PartyPer2 != undefined && this.PartyPer2 != null) ? parseFloat(this.PartyPer2.toString()) : 0,
      BrokerPer: (this.BrokerPer != undefined && this.BrokerPer != null) ? parseFloat(this.BrokerPer.toString()) : 0,
      BuyerPer: (this.BuyerPer != undefined && this.BuyerPer != null) ? parseFloat(this.BuyerPer.toString()) : 0,
      Terms: (terms == null || terms == undefined) ? null : terms
    }
    this.loader.show(true);
    this.confirmService.PriceChange(obj).subscribe(result => {
      this.loader.show(false);
      this.diamonds = result;
      this.doPagination();
    }, erro => {
      this.loader.show(false);
      this.alertService.Error(this.translate.instant("admin.confirm.error"), "");
    })
  }

}
