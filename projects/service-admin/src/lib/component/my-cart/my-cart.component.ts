import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { CartModel } from '../../models/cart.model';
import { diamondsearchResult } from '../../models/diamond.result.model';
import { EntityModel } from '../../models/entity.model';
import { CartService } from '../../service/cart.service';
import { CartBroadcaster } from '../../service/cartbroadcaster';
import { EntityService } from '../../service/entity.service';
import { SearchService } from '../../service/search.service';
declare var $: any;

@Component({
  selector: 'lib-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

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
    , private modalService: NgbModal) { }
  PacketNos: string = '';
  deliveryAtList = [];
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
  ////summary variable
  searchResult: diamondsearchResult[] = [];
  AllSelected: boolean;
  CartResult: CartModel[];
  delveryAt: string = "Mumbai";
  ngOnInit(): void {
    this.entityService.GetDeliveryAt().subscribe(result => {

      this.deliveryAtList = result;
      this.delveryAt = this.deliveryAtList[0].deliveryAt;
    }, error => {

    })
    this.LoadCart();
  }

  ///Search Diamond
  searchDiamond() {
    if (this.CartResult.length > 0) {
      this.loader.show(true);
      var obj = {
        ShapeList: [],
        ColorList: [],
        FancyColorList: [],
        FancyOvertoneList: [],
        FancyIntensityList: [],
        ClarityList: [],
        CutList: [],
        PolishList: [],
        SymList: [],
        LocationList: [],
        FlourenceList: [],
        MilkyList: [],
        ShadeList: [],
        BlackIncTblList: [],
        BlackIncCrnList: [],
        WhiteIncTblList: [],
        WhiteIncCrnList: [],
        CuletList: [],
        EyeCleanList: [],
        NaturalGirdleList: [],
        NaturalPavList: [],
        NaturalCrnList: [],
        ExtraFacetPavList: [],
        ExtraFacetCrnList: [],
        FromgirdleList: [],
        TogirdleList: [],
        FromhaList: [],
        TohaList: [],
        KeytoSymbolList: [],
        CertificateList: [],
        LusterList: [],
        SelectedPointer: [],
        FancyColor: false,
        DelveryAt: this.delveryAt,
        PacketNos: this.PacketNos,
        Status: '',
        IsPriority: ''
      }
      this.searchService.Search(obj).subscribe(result => {
        this.loader.show(false);
        this.searchResult = result;
        this.calculateSummary();
        this.doPagination();
      }, error => {
        this.loader.show(false);
      })
    }else{
      this.searchResult=[];
      this.doPagination();
    }
  }

  sortedColumn: string;
  sortDirection = 'desc';
  sort(columnName) {
    this.loader.show(true);
    var oldresult = this.searchResult //JSON.parse(JSON.stringify(this.searchResult));
    this.searchResult = [];
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
    this.searchResult = oldresult;
    this.loader.show(false);
    this.calculateSummary();
    this.doPagination();
  }
  selectAll() {
    // var oldresult = JSON.parse(JSON.stringify(this.searchResult));
    this.searchResult.forEach(element => {
      element.selected = this.AllSelected;
    });
    // this.searchResult = [];
    // this.searchResult = oldresult;
    this.calculateSummary();
  }
  subItemcheckUncheck() {
    this.AllSelected = this.searchResult.length == this.searchResult.filter(x => x.selected == true).length;
    this.calculateSummary();
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
      this.searchResult.forEach(element => {
        this.totalPcs += 1;
        this.totalCarat += element.wt;
        this.totalPrice = this.totalPrice + (element.price * element.wt);
        TotalRapPrice = TotalRapPrice + ((element.price / ((element.back / 100) + 1)) * element.wt);
        if (element.selected) {
          this.selectedtotalPcs += 1;
          this.selectedtotalCarat += element.wt;
          this.selectedtotalPrice = this.selectedtotalPrice + (element.price * element.wt);
          selectedTotalRapPrice = selectedTotalRapPrice + ((element.price / ((element.back / 100) + 1)) * element.wt);
        }
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
  selectRow(item) {
    item.selected = !item.selected;
    this.AllSelected = this.searchResult.length == this.searchResult.filter(x => x.selected == true).length;
    this.calculateSummary();
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
    this.searchResult.forEach(element => {
      var cartItem = this.CartResult.filter(x => x.packetNo == element.packetNo)[0];
      element.price = cartItem.price;
      element.back = cartItem.back;
      element.deliveryAt = cartItem.deliveryAt;
    });
    this.PageCount = Math.ceil(this.searchResult.length / this.recordrerpage);
    var RecordNumber = 0;
    this.Pages = [];
    this.PageNos = [];
    for (var i = 0; i < this.PageCount; i++) {
      this.Pages.push(new Array());
      this.PageNos.push(i);
      var k = 0;
      for (var j = RecordNumber; j < this.searchResult.length; j++) {
        this.Pages[this.Pages.length - 1].push(this.searchResult[j]);
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
  toggleDetail(item) {
    item.showDetail = !item.showDetail;
  }
  collapseAll: boolean = false;
  toggleAllDetail() {
    this.collapseAll = !this.collapseAll;
    this.searchResult.forEach(element => {
      element.showDetail = this.collapseAll;
    });
  }
  ShowPopUp(item, flag: boolean) {

    if (!flag) {
      this.searchResult.forEach(element => {
        element.showPopUp = false;
      });
    }
    item.showPopUp = flag;
  }
  ChangeDeliveryAt() {
    this.UpdateCart();
  }
  ChangeStatus() {
    this.searchDiamond();
  }
  showSelected() {
    if (this.searchResult.filter(x => x.selected).length > 0) {
      localStorage.setItem("selectedResult", JSON.stringify(this.searchResult.filter(x => x.selected)));
      this.router.navigate([]).then(result => { window.open("/inventory/showselected", '_blank'); });
    } else {
      this.alertService.Error("Please select stone", "");
    }
  }
  showDetail(item) {
    localStorage.setItem("detailPacketNo", item.packetNo);
    this.router.navigate([]).then(result => { window.open("/inventory/diamondDetail", '_blank'); });
  }
  reload() {
    location.reload();
  }
  cartCount: number = 0;
  LoadCart() {
    this.cartService.GetAll().subscribe(result => {
      this.CartResult = result;
      this.cartCount = result.length;
      this.PacketNos = '';
      this.CartResult.forEach(element => {
        if (this.PacketNos == '') {
          this.PacketNos = element.packetNo;
        } else {
          this.PacketNos = this.PacketNos + "," + element.packetNo;
        }
      });
      
        this.searchDiamond();
    })
  }
  UpdateCart() {
    var SelectedResult = this.searchResult.filter(x => x.selected);
    if (SelectedResult.length <= 0)
      return;
    this.loader.show(true);

    var packetStr = "";
    SelectedResult.forEach(element => {
      if (packetStr == '') {
        packetStr = element.packetNo;
      } else
        packetStr = packetStr + ',' + element.packetNo;
    });
    var obj = {
      ShapeList: [],
      ColorList: [],
      FancyColorList: [],
      FancyOvertoneList: [],
      FancyIntensityList: [],
      ClarityList: [],
      CutList: [],
      PolishList: [],
      SymList: [],
      LocationList: [],
      FlourenceList: [],
      MilkyList: [],
      ShadeList: [],
      BlackIncTblList: [],
      BlackIncCrnList: [],
      WhiteIncTblList: [],
      WhiteIncCrnList: [],
      CuletList: [],
      EyeCleanList: [],
      NaturalGirdleList: [],
      NaturalPavList: [],
      NaturalCrnList: [],
      ExtraFacetPavList: [],
      ExtraFacetCrnList: [],
      FromgirdleList: [],
      TogirdleList: [],
      FromhaList: [],
      TohaList: [],
      KeytoSymbolList: [],
      CertificateList: [],
      LusterList: [],
      SelectedPointer: [],
      FancyColor: false,
      DelveryAt: this.delveryAt,
      PacketNos: packetStr,
      Status: '',
      IsPriority: ''
    }
    this.searchService.Search(obj).subscribe(result => {
      this.loader.show(false);
      var cnt = 0;
      if (result.length > 0) {
        result.forEach(element => {
          this.loader.show(true);
          var cartItem = this.CartResult.filter(x => x.packetNo == element.packetNo)[0];
          cartItem.price = element.price;
          cartItem.back = element.price;
          cartItem.deliveryAt = this.delveryAt;
          this.cartService.Update(cartItem).subscribe(updateResult => {
            cnt++;
            if (cnt == result.length - 1) {
              this.loader.show(false);
              this.LoadCart();
            }
          }, error => {
            cnt++;
            if (cnt == result.length - 1) {
              this.loader.show(false);
              this.LoadCart();
            }
          })
        });
      }
    }, error => {
      this.loader.show(false);
    })
  }
  RemoveItem(item: diamondsearchResult) {

    this.loader.show(true);
    var packetStr = item.packetNo;

    var obj = {
      ShapeList: [],
      ColorList: [],
      FancyColorList: [],
      FancyOvertoneList: [],
      FancyIntensityList: [],
      ClarityList: [],
      CutList: [],
      PolishList: [],
      SymList: [],
      LocationList: [],
      FlourenceList: [],
      MilkyList: [],
      ShadeList: [],
      BlackIncTblList: [],
      BlackIncCrnList: [],
      WhiteIncTblList: [],
      WhiteIncCrnList: [],
      CuletList: [],
      EyeCleanList: [],
      NaturalGirdleList: [],
      NaturalPavList: [],
      NaturalCrnList: [],
      ExtraFacetPavList: [],
      ExtraFacetCrnList: [],
      FromgirdleList: [],
      TogirdleList: [],
      FromhaList: [],
      TohaList: [],
      KeytoSymbolList: [],
      CertificateList: [],
      LusterList: [],
      SelectedPointer: [],
      FancyColor: false,
      DelveryAt: this.delveryAt,
      PacketNos: packetStr,
      Status: '',
      IsPriority: ''
    }
    this.searchService.Search(obj).subscribe(result => {
      this.loader.show(false);
      var cnt = 0;
      if (result.length > 0) {
        result.forEach(element => {
          this.loader.show(true);
          var cartItem = this.CartResult.filter(x => x.packetNo == element.packetNo)[0];
          cartItem.price = element.price;
          cartItem.back = element.price;
          cartItem.deliveryAt = this.delveryAt;
          this.cartService.Delete(cartItem).subscribe(updateResult => {

            this.loader.show(false);
            this.LoadCart();

          }, error => {
            this.loader.show(false);
            this.LoadCart();
          })
        });
      }
    }, error => {
      this.loader.show(false);
    })
  }
  RemoveAll() {
    var SelectedResult = this.searchResult.filter(x => x.selected);
    if (SelectedResult.length <= 0)
      return;
    this.loader.show(true);

    var packetStr = "";
    SelectedResult.forEach(element => {
      if (packetStr == '') {
        packetStr = element.packetNo;
      } else
        packetStr = packetStr + ',' + element.packetNo;
    });
    var obj = {
      ShapeList: [],
      ColorList: [],
      FancyColorList: [],
      FancyOvertoneList: [],
      FancyIntensityList: [],
      ClarityList: [],
      CutList: [],
      PolishList: [],
      SymList: [],
      LocationList: [],
      FlourenceList: [],
      MilkyList: [],
      ShadeList: [],
      BlackIncTblList: [],
      BlackIncCrnList: [],
      WhiteIncTblList: [],
      WhiteIncCrnList: [],
      CuletList: [],
      EyeCleanList: [],
      NaturalGirdleList: [],
      NaturalPavList: [],
      NaturalCrnList: [],
      ExtraFacetPavList: [],
      ExtraFacetCrnList: [],
      FromgirdleList: [],
      TogirdleList: [],
      FromhaList: [],
      TohaList: [],
      KeytoSymbolList: [],
      CertificateList: [],
      LusterList: [],
      SelectedPointer: [],
      FancyColor: false,
      DelveryAt: this.delveryAt,
      PacketNos: packetStr,
      Status: '',
      IsPriority: ''
    }
    this.searchService.Search(obj).subscribe(result => {
      this.loader.show(false);
      var cnt = 0;
      if (result.length > 0) {
        this.loader.show(true);
        result.forEach(element => {
          var cartItem = this.CartResult.filter(x => x.packetNo == element.packetNo)[0];
          if (cartItem != undefined) {
            cartItem.price = element.price;
            cartItem.back = element.price;
            cartItem.deliveryAt = this.delveryAt;
            this.cartService.Delete(cartItem).subscribe(updateResult => {
              cnt++;
              if (cnt == result.length - 1) {
                this.loader.show(false);
                this.LoadCart();
              }
            }, error => {
              cnt++;
              if (cnt == result.length - 1) {
                this.loader.show(false);
                this.LoadCart();
              }
            })
          }
        });
      }
    }, error => {
      this.loader.show(false);
    })
  }
  ChangeItemDeliveryAt(item) {
    this.loader.show(true);
    var packetStr = item.packetNo;

    var obj = {
      ShapeList: [],
      ColorList: [],
      FancyColorList: [],
      FancyOvertoneList: [],
      FancyIntensityList: [],
      ClarityList: [],
      CutList: [],
      PolishList: [],
      SymList: [],
      LocationList: [],
      FlourenceList: [],
      MilkyList: [],
      ShadeList: [],
      BlackIncTblList: [],
      BlackIncCrnList: [],
      WhiteIncTblList: [],
      WhiteIncCrnList: [],
      CuletList: [],
      EyeCleanList: [],
      NaturalGirdleList: [],
      NaturalPavList: [],
      NaturalCrnList: [],
      ExtraFacetPavList: [],
      ExtraFacetCrnList: [],
      FromgirdleList: [],
      TogirdleList: [],
      FromhaList: [],
      TohaList: [],
      KeytoSymbolList: [],
      CertificateList: [],
      LusterList: [],
      SelectedPointer: [],
      FancyColor: false,
      DelveryAt: item.deliveryAt,
      PacketNos: packetStr,
      Status: '',
      IsPriority: ''
    }
    this.searchService.Search(obj).subscribe(result => {
      this.loader.show(false);
      var cnt = 0;
      if (result.length > 0) {
        result.forEach(element => {
          this.loader.show(true);
          var cartItem = this.CartResult.filter(x => x.packetNo == element.packetNo)[0];
          cartItem.price = element.price;
          cartItem.back = element.price;
          cartItem.deliveryAt = item.deliveryAt;
          this.cartService.Update(cartItem).subscribe(updateResult => {

            this.loader.show(false);
            this.LoadCart();

          }, error => {
            this.loader.show(false);
            this.LoadCart();
          })
        });
      }
    }, error => {
      this.loader.show(false);
    })
  }
  offerDiamonds:diamondsearchResult[]=[];
  LoadOfferModel(content){
      this.offerDiamonds= JSON.parse(JSON.stringify(this.searchResult.filter(x=>x.selected))) ;
      this.offerDiamonds.forEach(element => {
         element._offerBack=element.back; 
         element._offerPrice=element.price;
         element.selected=false;
         element.deliveryAt=this.delveryAt; 
         element.showDetail=false;
      });
      if(this.offerDiamonds.length > 0){
        
        this.modalService.open(content, { backdrop:"static",size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      
        }, (reason) => {
    
        });
      }
  }
  inquiryDiamonds:diamondsearchResult[]=[];
  LoadInquiryModel(content){
      this.inquiryDiamonds= JSON.parse(JSON.stringify(this.searchResult.filter(x=>x.selected))) ;
      this.inquiryDiamonds.forEach(element => {
         element.selected=false;
         element.deliveryAt=this.delveryAt; 
         element.showDetail=false;
      });
      if(this.inquiryDiamonds.length > 0){
        
        this.modalService.open(content, { backdrop:"static",size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      
        }, (reason) => {
    
        });
      }
  }
  HoldDiamonds: diamondsearchResult[] = [];
  LoadHoldModel(content) {
    this.HoldDiamonds = JSON.parse(JSON.stringify(this.searchResult.filter(x => x.selected)));
    this.HoldDiamonds.forEach(element => {
      element.selected = false;
      element.deliveryAt = this.delveryAt;
      element.showDetail = false;
    });
    if (this.HoldDiamonds.length > 0) {

      this.modalService.open(content, { backdrop: "static", size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      }, (reason) => {

      });
    }
  }
  ConfirmDiamonds: diamondsearchResult[] = [];
  LoadConfirmModel(content) {
    this.ConfirmDiamonds = JSON.parse(JSON.stringify(this.searchResult.filter(x => x.selected)));
    this.ConfirmDiamonds.forEach(element => {
      element.selected = false;
      element.deliveryAt = this.delveryAt;
      element.showDetail = false;
    });
    if (this.ConfirmDiamonds.length > 0) {

      this.modalService.open(content, { backdrop: "static", size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      }, (reason) => {

      });
    }
  }
  InquirySave(data){
      this.searchDiamond();
  }
  HoldSave(data){
    this.searchDiamond();
  }
  ConfirmSave(data){
    this.searchDiamond();
  }
}
