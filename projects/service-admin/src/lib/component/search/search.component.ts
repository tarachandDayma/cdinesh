import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { first } from 'rxjs/operators';
import { alertserice, EnvironmentService, FormValidationService, loaderserice } from 'service-common';
import { CartModel } from '../../models/cart.model';
import { diamondsearchResult } from '../../models/diamond.result.model';
import { DiamondCommentModel } from '../../models/diamondComment.model';
import { EntityModel } from '../../models/entity.model';
import { ExportToEmailModel } from '../../models/exportToEmail.model';
import { RoleModuleAccessModel } from '../../models/role.module.access.model';
import { ScheduleModel } from '../../models/schedule.model';
import { UserDownloadMasterModel } from '../../models/user.download.master.model';
import { UserSearchModel } from '../../models/user.search.model';
import { UserWishModel } from '../../models/userWish.model';
import { CartService } from '../../service/cart.service';
import { DiamondCommentService } from '../../service/diamond.comment.service';
import { DiamondTrackService } from '../../service/diamond.track.service';
import { DownloadService } from '../../service/download.service';
import { EntityService } from '../../service/entity.service';
import { RoleModuleAccessService } from '../../service/role.module.access.service';
import { ScheduleService } from '../../service/schedule.service';
import { SearchService } from '../../service/search.service';
import { TrackTypeService } from '../../service/track.type.service';
import { UserService } from '../../service/user.service';
import { UserWishService } from '../../service/user.wish.service';
import { UserSaveSearchService } from '../../service/userSaveSearch.service';


declare var $: any;
@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private loader: loaderserice
    , private router: Router
    , private alertService: alertserice
    , public translate: TranslateService
    , private formvalidationService: FormValidationService
    , private entityService: EntityService
    , private route: ActivatedRoute
    , private searchService: SearchService
    , private cartService: CartService
    , private modalService: NgbModal
    , private downloadService: DownloadService
    , private environmentService: EnvironmentService
    , private userService: UserService
    , private diamondCommentService: DiamondCommentService
    , private userSaveSearchService: UserSaveSearchService
    , private userWishService: UserWishService
    , private scheduleService: ScheduleService
    , private diamondTrackService: DiamondTrackService
    , private trackTypeService: TrackTypeService
    , private roleModuleAccessService: RoleModuleAccessService
  ) { }
  roleModuleAccessList: RoleModuleAccessModel[] = [];
  shapeList: any;
  colorList: any;
  fancycolorList: any;
  fancyOvertoneList: any;
  fancyIntensityList: any;
  clarityList: any;
  cutList: any;
  polishList: any;
  symList: any;
  locationList: any;
  flourenceList: any;
  milkyList: any;
  shadeList: any;
  lusterList: any;
  blackIncTblList: any;
  blackIncCrnList: any;
  whiteIncTblList: any;
  whiteIncCrnList: any;
  culetList: any;
  eyeCleanList: any;
  naturalGirdleList: any;
  naturalPavList: any;
  naturalCrnList: any;
  extraFacetPavList: any;
  extraFacetCrnList: any;
  fromgirdleList: any;
  togirdleList: any;
  fromhaList: any;
  tohaList: any;
  keytoSymbolList: any;
  certificateList: any;
  caratRange: any;

  defaultCaratRange: any[];
  fromCarat: number;
  toCarat: number;
  selectedPointer: any[];
  showMorePointer: boolean = false;
  fancyColor: boolean = false;
  fromPrice: number;
  toPrice: number;
  fromTotalPrice: number;
  toTotalPrice: number;
  fromLength: number;
  toLength: number;
  fromWidth: number;
  toWidth: number;
  fromDepth: number;
  toDepth: number;
  fromRatio: number;
  toRatio: number;
  fromTablePer: number;
  toTablePer: number;
  fromDepthPer: number;
  toDepthPer: number;
  fromGirdlePer: number;
  toGirdlePer: number;
  fromCrownHeight: number;
  toCrownHeight: number;
  fromPavDepth: number;
  toPevDepth: number;
  fromPavAngle: number;
  toPevAngle: number;
  fromCrownAngle: number;
  toCrownAngle: number;
  video: boolean = false;
  sealdStone: boolean = false;
  keytoSymbolContains: boolean = true;
  jewellerChoice: boolean = false;
  sarineDiamondJourney: boolean = false;
  nobgm: boolean = false;
  _3Ex: boolean = false;
  _2Ex: boolean = false;
  _3Vg: boolean = false;
  delveryAt: string;
  deliveryAtList = [];
  showResult: boolean = false;
  searchResult: diamondsearchResult[] = [];
  AllSelected: boolean = false;
  PacketNos: string = '';
  Status: string = '';
  IsPriority: string = '';
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
  IsRecentSearch: boolean = false;
  PairSearch: boolean = false;
  currentSearch: UserSearchModel = new UserSearchModel();
  currentWish: UserWishModel = new UserWishModel();
  currentSchedule: ScheduleModel = new ScheduleModel();
  isUpcommingSearch: boolean = false;
  catchRouteParam() {

    if (-1 != this.router.url.indexOf("fancySearch")) {
      this.fancyColor = true;
      localStorage.setItem("PacketNo", "");
    } else if (-1 != this.router.url.indexOf("SearchPacket")) {
      this.PacketNos = localStorage.getItem("PacketNo");
      this.searchDiamond();
    } else if (-1 != this.router.url.indexOf("newgoods")) {
      this.Status = "N";
      this.searchDiamond();
      localStorage.setItem("PacketNo", "");
    } else if (-1 != this.router.url.indexOf("upcoming")) {
      this.isUpcommingSearch = true;
      this.searchDiamond();
      localStorage.setItem("PacketNo", "");
    }
    else if (-1 != this.router.url.indexOf("bestofcd")) {
      this.IsPriority = 'Y'
      this.searchDiamond();
      localStorage.setItem("PacketNo", "");
    } else if (-1 != this.router.url.indexOf("showselected")) {
      this.showResult = true;
      this.searchResult = JSON.parse(localStorage.getItem("selectedResult"));
      this.doPagination();
      this.calculateSummary();
      localStorage.setItem("PacketNo", "");
    } else {
      if (localStorage.getItem("recentSearch") != undefined && localStorage.getItem("recentSearch") != "") {
        var recentSearch: UserSearchModel = JSON.parse(localStorage.getItem("recentSearch"));
        var SearchFilter = JSON.parse(recentSearch.searchData);
        this.IsRecentSearch = true;
        this.SetFilterObject(SearchFilter);
        localStorage.setItem("recentSearch", "")
      } else if (localStorage.getItem("saveSearch") != undefined && localStorage.getItem("saveSearch") != "") {
        this.currentSearch = JSON.parse(localStorage.getItem("saveSearch"));
        var SearchFilter = JSON.parse(this.currentSearch.searchData);
        this.IsRecentSearch = true;
        this.SetFilterObject(SearchFilter);
        localStorage.setItem("saveSearch", "");
      } else if (localStorage.getItem("modifySearch") != undefined && localStorage.getItem("modifySearch") != "") {
        this.currentSearch = JSON.parse(localStorage.getItem("modifySearch"));
        var SearchFilter = JSON.parse(this.currentSearch.searchData);
        this.IsRecentSearch = true;
        this.ModifyFilterObject(SearchFilter);
        localStorage.setItem("modifySearch", "");
      } else if (localStorage.getItem("saveUserWish") != undefined && localStorage.getItem("saveUserWish") != "") {
        this.currentWish = JSON.parse(localStorage.getItem("saveUserWish"));
        this.wishId = this.currentWish.id;
        var SearchFilter = JSON.parse(this.currentWish.searchData);
        this.IsRecentSearch = true;
        this.SetFilterObject(SearchFilter);
        localStorage.setItem("saveUserWish", "");
      } else if (localStorage.getItem("modifyUserWish") != undefined && localStorage.getItem("modifyUserWish") != "") {
        this.currentWish = JSON.parse(localStorage.getItem("modifyUserWish"));
        this.wishId = this.currentWish.id;
        var SearchFilter = JSON.parse(this.currentWish.searchData);
        this.IsRecentSearch = true;
        this.ModifyFilterObject(SearchFilter);
        localStorage.setItem("modifyUserWish", "");
      } else if (localStorage.getItem("saveUserSchedule") != undefined && localStorage.getItem("saveUserSchedule") != "") {
        this.currentSchedule = JSON.parse(localStorage.getItem("saveUserSchedule"));
        var SearchFilter = JSON.parse(this.currentSchedule.queryJson);
        this.IsRecentSearch = true;
        this.SetFilterObject(SearchFilter);
        localStorage.setItem("saveUserSchedule", "");
      } else if (localStorage.getItem("modifyUserSchedule") != undefined && localStorage.getItem("modifyUserSchedule") != "") {
        this.currentSchedule = JSON.parse(localStorage.getItem("modifyUserSchedule"));
        var SearchFilter = JSON.parse(this.currentSchedule.queryJson);
        this.IsRecentSearch = true;
        this.ModifyFilterObject(SearchFilter);
        localStorage.setItem("modifyUserSchedule", "");
      }
      else
        localStorage.setItem("PacketNo", "");
    }
  }
  ngOnInit(): void {

    this.scheduleService.GetCountry().subscribe(result => {
      this.countryList = result;
    }, error => {

    });
    this.LoadCart();
    this.selectedPointer = [];
    this.defaultCaratRange = [
      {
        lable: "30s Down",
        selected: false,
        list: [
          {
            selected: false,
            from: "0.150",
            to: "0.179",
            labelfrom: "0.15",
            labelto: "0.17"
          }, {
            selected: false,
            from: "0.180",
            to: "0.229",
            labelfrom: "0.18",
            labelto: "0.22"
          }, {
            selected: false,
            from: "0.230",
            to: "0.299",
            labelfrom: "0.23",
            labelto: "0.29"
          }
        ]
      },
      {
        lable: "30s",
        selected: false,
        list: [
          {
            selected: false,
            from: "0.300",
            to: "0.349",
            labelfrom: "0.30",
            labelto: "0.34"
          }, {
            selected: false,
            from: "0.350",
            to: "0.379",
            labelfrom: "0.35",
            labelto: "0.37"
          }, {
            selected: false,
            from: "0.380",
            to: "0.399",
            labelfrom: "0.38",
            labelto: "0.39"
          }
        ]
      },
      {
        lable: "40s",
        selected: false,
        list: [
          {
            selected: false,
            from: "0.400",
            to: "0.459",
            labelfrom: "0.40",
            labelto: "0.45"
          }, {
            selected: false,
            from: "0.460",
            to: "0.499",
            labelfrom: "0.46",
            labelto: "0.49"
          }
        ]
      },
      {
        lable: "50s - 60s",
        selected: false,
        list: [
          {
            selected: false,
            from: "0.500",
            to: "0.589",
            labelfrom: "0.50",
            labelto: "0.58"
          }, {
            selected: false,
            from: "0.590",
            to: "0.649",
            labelfrom: "0.59",
            labelto: "0.64"
          }, {
            selected: false,
            from: "0.650",
            to: "0.699",
            labelfrom: "0.65",
            labelto: "0.69"
          }
        ]
      },
      {
        lable: "70s - 80s",
        selected: false,
        list: [
          {
            selected: false,
            from: "0.700",
            to: "0.719",
            labelfrom: "0.70",
            labelto: "0.71"
          }, {
            selected: false,
            from: "0.720",
            to: "0.749",
            labelfrom: "0.72",
            labelto: "0.74"
          }, {
            selected: false,
            from: "0.750",
            to: "0.799",
            labelfrom: "0.75",
            labelto: "0.79"
          }, {
            selected: false,
            from: "0.800",
            to: "0.899",
            labelfrom: "0.80",
            labelto: "0.89"
          }
        ]
      },
      {
        lable: "90s",
        selected: false,
        list: [
          {
            selected: false,
            from: "0.900",
            to: "0.959",
            labelfrom: "0.90",
            labelto: "0.95"
          }, {
            selected: false,
            from: "0.960",
            to: "0.999",
            labelfrom: "0.96",
            labelto: "0.99"
          }
        ]
      }
      ,
      {
        lable: "1ct",
        selected: false,
        list: [
          {
            selected: false,
            from: "1.000",
            to: "1.199",
            labelfrom: "1.00",
            labelto: "1.19"
          }, {
            selected: false,
            from: "1.200",
            to: "1.499",
            labelfrom: "1.20",
            labelto: "1.49"
          }
        ]
      }
      ,
      {
        lable: "1.5ct",
        selected: false,
        list: [
          {
            selected: false,
            from: "1.500",
            to: "1.699",
            labelfrom: "1.50",
            labelto: "1.69"
          }, {
            selected: false,
            from: "1.700",
            to: "1.999",
            labelfrom: "1.70",
            labelto: "1.99"
          }
        ]
      }
      ,
      {
        lable: "2ct",
        selected: false,
        list: [
          {
            selected: false,
            from: "2.000",
            to: "2.499",
            labelfrom: "2.00",
            labelto: "2.49"
          }, {
            selected: false,
            from: "2.500",
            to: "2.999",
            labelfrom: "2.50",
            labelto: "2.99"
          }

        ]
      },
      {
        lable: "3ct - 4ct",
        selected: false,
        list: [
          {
            selected: false,
            from: "3.000",
            to: "3.499",
            labelfrom: "3.00",
            labelto: "3.49"
          }, {
            selected: false,
            from: "3.500",
            to: "3.999",
            labelfrom: "3.50",
            labelto: "3.99"
          }
          , {
            selected: false,
            from: "4.000",
            to: "4.499",
            labelfrom: "4.00",
            labelto: "4.49"
          }, {
            selected: false,
            from: "4.500",
            to: "4.999",
            labelfrom: "4.50",
            labelto: "4.99"
          }

        ]
      },
      {
        lable: "5ct +",
        selected: false,
        list: [
          {
            selected: false,
            from: "5.000",
            to: "5.499",
            labelfrom: "5.00",
            labelto: "5.49"
          }, {
            selected: false,
            from: "5.500",
            to: "5.999",
            labelfrom: "5.50",
            labelto: "5.99"
          }
          , {
            selected: false,
            from: "6.000",
            to: "6.999",
            labelfrom: "6.00",
            labelto: "6.99"
          }, {
            selected: false,
            from: "7.000",
            to: "7.999",
            labelfrom: "7.00",
            labelto: "7.99"
          }
          , {
            selected: false,
            from: "8.000",
            to: "9.999",
            labelfrom: "8.00",
            labelto: "9.99"
          }
          , {
            selected: false,
            from: "10.000",
            to: "99.999",
            labelfrom: "10.00",
            labelto: "99.99"
          }

        ]
      }
    ];
    this.shapeList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.colorList = {
      allSelected: true,
      selectedOther: false,
      RangeSelection: true,
      list: []
    };
    this.clarityList = {
      allSelected: true,
      selectedOther: false,
      RangeSelection: true,
      list: []
    };
    this.cutList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.polishList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.symList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.locationList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.fancycolorList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.fancyOvertoneList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.fancyIntensityList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.flourenceList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.shadeList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.milkyList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.lusterList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.blackIncCrnList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.blackIncTblList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.whiteIncCrnList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.whiteIncTblList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.culetList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.eyeCleanList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.naturalGirdleList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.naturalPavList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.naturalCrnList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.extraFacetCrnList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.extraFacetPavList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.fromgirdleList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.togirdleList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.fromhaList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.tohaList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.keytoSymbolList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.certificateList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    if (!this.IsRecentSearch) {
      this.LoadDbParameter();
    }
    this.catchRouteParam();

    this.entityService.GetDeliveryAt().subscribe(result => {

      this.deliveryAtList = result;
      this.delveryAt = this.deliveryAtList[0].deliveryAt;
    }, error => {

    })

  }

  CheckModuleAccess(ModuleName: string, action: string): boolean {
    if (this.environmentService.UserModuleAccessList != null) {
      var access = this.environmentService.UserModuleAccessList.filter(x => x.id > 0 && x.action == action && x.moduleName == ModuleName)[0];
      if (access == null || access == undefined) {
        if (this.environmentService.RoleModuleAccessList != null) {
          var roleaccess = this.environmentService.RoleModuleAccessList.filter(x => x.id > 0 && x.action == action && x.moduleName == ModuleName)[0];
          if (roleaccess == null || roleaccess == undefined) {
            return true;
          } else {
            return roleaccess.isActive;
          }
        } else {
          return true;
        }
      } else {
        return access.isActive;
      }
    } else {
      return true;
    }

  }
  hideDefualtPointer=false;
  LoadDbParameter() {
    if (this.environmentService.searchStock != undefined && this.environmentService.searchStock != null) {
      this.ModifyFilterObjectByAccess(this.environmentService.searchStock);
     
    } else {
      this.entityService.GetEntity("Shape").subscribe(result => {

        this.shapeList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("Colour").subscribe(result => {

        this.colorList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("Clarity").subscribe(result => {

        this.clarityList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("cut").subscribe(result => {

        this.cutList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("polish").subscribe(result => {

        this.polishList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("Symmetry").subscribe(result => {

        this.symList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("Location").subscribe(result => {

        this.locationList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("FancyColor").subscribe(result => {

        this.fancycolorList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("FancyColorOvertone").subscribe(result => {

        this.fancyOvertoneList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("FancyColorIntensity").subscribe(result => {

        this.fancyIntensityList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("Flourence").subscribe(result => {

        this.flourenceList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("shade").subscribe(result => {

        this.shadeList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("milky").subscribe(result => {

        this.milkyList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("Lusture").subscribe(result => {

        this.lusterList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("BlackCrown").subscribe(result => {

        this.blackIncCrnList.list = result;
        this.whiteIncCrnList.list = JSON.parse(JSON.stringify(result));
      }, error => {

      })
      this.entityService.GetEntity("BlackTable").subscribe(result => {

        this.blackIncTblList.list = result;
        this.whiteIncTblList.list = JSON.parse(JSON.stringify(result));
      }, error => {

      })
      this.entityService.GetEntity("Culet").subscribe(result => {

        this.culetList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("ExtraFacetCrown").subscribe(result => {

        this.extraFacetCrnList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("ExtraFacetPavilion").subscribe(result => {

        this.extraFacetPavList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("EyeClean").subscribe(result => {

        this.eyeCleanList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("NaturalGirdle").subscribe(result => {

        this.naturalGirdleList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("NaturalPavilion").subscribe(result => {

        this.naturalPavList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("NaturalCrown").subscribe(result => {

        this.naturalCrnList.list = result;
      }, error => {

      })
      this.entityService.GetEntity("Girdle").subscribe(result => {

        this.fromgirdleList.list = result;
        this.togirdleList.list = JSON.parse(JSON.stringify(result));
      }, error => {

      })
      this.entityService.GetEntity("HNA").subscribe(result => {

        this.fromhaList.list = result;
        this.tohaList.list = JSON.parse(JSON.stringify(result));
      }, error => {

      })
      this.entityService.GetEntity("Certificate").subscribe(result => {

        this.certificateList.list = result;
      }, error => {

      })
      this.entityService.GetAdvanceEntity("Keytosymbol").subscribe(result => {

        this.keytoSymbolList.list = result;
      }, error => {

      })
    }
  }
  toggleKeyToSymbol() {
    this.keytoSymbolContains = !this.keytoSymbolContains;
  }
  ShowMoreLess(list) {
    list.showMore = !list.showMore;
  }
  showFancy(flag: boolean) {
    this.fancyColor = flag;
  }
  SelectCriteria(list: any, item: any) {
    if (item != null) {
      var selectedList = list.list.filter(x => x.selected == true);
      var firstSelected = selectedList[0];
      var lastSelected = selectedList[selectedList.length - 1];
      if (firstSelected != undefined && list.RangeSelection) {
        var firstIndex = list.list.indexOf(firstSelected);
        var lastIndex = list.list.indexOf(lastSelected);
        var currentIndex = list.list.indexOf(item);
        var rangeLeft = currentIndex - firstIndex;
        var rangeRight = lastIndex - currentIndex;

        if (firstIndex == currentIndex || lastIndex == currentIndex)
          item.selected = !item.selected;
        else
          if (rangeLeft < rangeRight) {
            for (let index = 0; index < list.list.length; index++) {
              list.list[index].selected = false;
            }
            for (let index = currentIndex; index <= lastIndex; index++) {
              list.list[index].selected = true;
            }
          } else if (rangeRight < rangeLeft) {
            for (let index = 0; index < list.list.length; index++) {
              list.list[index].selected = false;
            }
            for (let index = firstIndex; index <= currentIndex; index++) {
              list.list[index].selected = true;
            }
          } else if (rangeRight == rangeLeft) {
            if (firstIndex == currentIndex && lastIndex == currentIndex)
              item.selected = !item.selected;
            else {
              for (let index = 0; index < list.list.length; index++) {
                list.list[index].selected = false;
              }
              for (let index = firstIndex; index <= currentIndex; index++) {
                list.list[index].selected = true;
              }
            }
          }
      } else {
        item.selected = item.selected != true;
      }
      list.allSelected = list.list.filter(x => x.selected != true).length == list.list.length;
      var indx = list.list.indexOf(item);
      for (let index = 0; index < list.list.length; index++) {
        if (index > 9 && list.list[index].selected == true) {
          list.selectedOther = true;
          break;
        } else if (index > 9) {
          list.selectedOther = false;
        }
      }
      if (list == this.cutList || list == this.polishList || list == this.symList) {
        this._2Ex = false;
        this._3Ex = false;
        this._3Vg = false;
      }
      if (list == this.shadeList || list == this.milkyList) {
        this.nobgm = false;
      }
    } else {
      list.allSelected = !list.allSelected;
      list.selectedOther = !list.allSelected;
      list.list.forEach(element => {
        element.selected = !list.allSelected;
      });
    }
  }
  refreshList(list: any) {
    list.allSelected = true;
    list.selectedOther = false;
    for (let index = 0; index < list.list.length; index++) {
      list.list[index].selected = false;
    }
  }
  openMorePointer() {
    this.showMorePointer = !this.showMorePointer;
  }

  selectPointer(parentItem: any, item: any) {
    this.selectedPointer = [];
    item.selected = !item.selected;
    if (parentItem == null) {
      item.list.forEach(element => {
        element.selected = item.selected
      });
    } else {
      parentItem.selected = parentItem.list.filter(x => x.selected == true).length == parentItem.list.length;
    }
    for (let j = 0; j < this.defaultCaratRange.length; j++) {
      const subElement = this.defaultCaratRange[j];
      for (let k = 0; k < subElement.list.length; k++) {
        const subsubelement = subElement.list[k];
        if (subsubelement.selected) {
          var flag = true;
          for (let index = 0; index < this.selectedPointer.length; index++) {
            const element = this.selectedPointer[index];
            if (subsubelement.from >= element.from && subsubelement.from <= element.to) {
              flag = false;
            } else if (subsubelement.to >= element.from && subsubelement.to <= element.to) {
              flag = false;
            }
          }
          if (flag == true) {
            this.selectedPointer.push({ from: subsubelement.from, to: subsubelement.to });
          }
        }
      }
    }
  }
  removeCaratRange(item) {
    var indx = this.selectedPointer.indexOf(item);
    for (let j = 0; j < this.defaultCaratRange.length; j++) {
      var subElement = this.defaultCaratRange[j];
      for (let k = 0; k < subElement.list.length; k++) {
        var subsubelement = subElement.list[k];
        if (subsubelement.selected) {
          if (subsubelement.from == item.from && subsubelement.to == item.to) {
            subsubelement.selected = false;
          }
        }
      }
      subElement.selected = subElement.list.filter(x => x.selected == true).length == subElement.list.length;
    }
    this.selectedPointer.splice(indx, 1);
  }
  resetPointer() {
    this.selectedPointer = [];
    for (let j = 0; j < this.defaultCaratRange.length; j++) {
      this.defaultCaratRange[j].selected = false;
      const subElement = this.defaultCaratRange[j];
      for (let k = 0; k < subElement.list.length; k++) {
        subElement.list[k].selected = false;;
      }
    }
  }
  addPointer() {
    if (this.fromCarat > 0 && this.toCarat > 0) {
      var newPointerList = [];
      // var flag = true;
      // for (let index = 0; index < this.selectedPointer.length; index++) {
      //   const element = this.selectedPointer[index];
      //   if (this.fromCarat >= element.from && this.fromCarat <= element.to) {
      //     flag = false;
      //   } else if (this.toCarat >= element.from && this.toCarat <= element.to) {
      //     flag = false;
      //   }
      // }
      // if (flag == true) {
      this.selectedPointer.push({ from: this.fromCarat.toString(), to: this.toCarat.toString() });
      // }
    }
    this.fromCarat = 0;
    this.toCarat = 0;
  }
  toggleNoBGM() {
    if (!this.nobgm) {
      this.shadeList.list.forEach(element => {
        element.selected = false;
      });
      this.milkyList.list.forEach(element => {
        element.selected = false;
      });
      var shadeWhite = this.shadeList.list.filter(x => x.id == 248)[0];
      var shadeLc = this.shadeList.list.filter(x => x.id == 249)[0];
      var MilkyNone = this.milkyList.list.filter(x => x.id == 201)[0];
      this.SelectCriteria(this.shadeList, shadeWhite);
      this.SelectCriteria(this.shadeList, shadeLc);
      this.SelectCriteria(this.milkyList, MilkyNone);
      this.nobgm = true;
    } else {
      this.SelectCriteria(this.shadeList, null);
      this.SelectCriteria(this.milkyList, null);
      this.nobgm = false;
    }
  }
  select3Ex() {
    if (this._3Ex) {
      this._3Ex = false;
      this.cutList.allSelected = true;
      this.polishList.allSelected = true;
      this.symList.allSelected = true;
      this.cutList.list.forEach(element => {
        element.selected = false;
      });
      this.polishList.list.forEach(element => {
        element.selected = false;
      });
      this.symList.list.forEach(element => {
        element.selected = false;
      });
    } else {
      this.cutList.list.forEach(element => {
        element.selected = false;
      });
      this.polishList.list.forEach(element => {
        element.selected = false;
      });
      this.symList.list.forEach(element => {
        element.selected = false;
      });
      var _cutList = this.cutList.list.filter(x => x.id == 218 || x.id == 219);
      var _polishList = this.polishList.list.filter(x => x.id == 161 || x.id == 162);
      var _symList = this.symList.list.filter(x => x.id == 169 || x.id == 170);
      _cutList.forEach(element => {
        this.SelectCriteria(this.cutList, element);
      });
      _polishList.forEach(element => {
        this.SelectCriteria(this.polishList, element);
      });
      _symList.forEach(element => {
        this.SelectCriteria(this.symList, element);
      });
      this._3Ex = true;
      this._2Ex = false;
      this._3Vg = false;
    }
  }
  select2Ex() {
    if (this._2Ex) {
      this._2Ex = false;
      this.cutList.allSelected = true;
      this.polishList.allSelected = true;
      this.symList.allSelected = true;
      this.cutList.list.forEach(element => {
        element.selected = false;
      });
      this.polishList.list.forEach(element => {
        element.selected = false;
      });
      this.symList.list.forEach(element => {
        element.selected = false;
      });
    } else {
      this.cutList.list.forEach(element => {
        element.selected = false;
      });
      this.polishList.list.forEach(element => {
        element.selected = false;
      });
      this.symList.list.forEach(element => {
        element.selected = false;
      });
      var _cutList = this.cutList.list.filter(x => x.id == 218 || x.id == 219);
      var _polishList = this.polishList.list.filter(x => x.id == 161 || x.id == 162);
      _cutList.forEach(element => {
        this.SelectCriteria(this.cutList, element);
      });
      _polishList.forEach(element => {
        this.SelectCriteria(this.polishList, element);
      });
      this._3Ex = false;
      this._2Ex = true;
      this._3Vg = false;
    }
  }
  select3VG() {
    if (this._3Vg) {
      this._3Vg = false;
      this.cutList.allSelected = true;
      this.polishList.allSelected = true;
      this.symList.allSelected = true;
      this.cutList.list.forEach(element => {
        element.selected = false;
      });
      this.polishList.list.forEach(element => {
        element.selected = false;
      });
      this.symList.list.forEach(element => {
        element.selected = false;
      });
    } else {
      this.cutList.list.forEach(element => {
        element.selected = false;
      });
      this.polishList.list.forEach(element => {
        element.selected = false;
      });
      this.symList.list.forEach(element => {
        element.selected = false;
      });
      var _cutList = this.cutList.list.filter(x => x.id == 218 || x.id == 219 || x.id == 220);
      var _polishList = this.polishList.list.filter(x => x.id == 161 || x.id == 162 || x.id == 163);
      var _symList = this.symList.list.filter(x => x.id == 169 || x.id == 170 || x.id == 171);
      _cutList.forEach(element => {
        this.SelectCriteria(this.cutList, element);
      });
      _polishList.forEach(element => {
        this.SelectCriteria(this.polishList, element);
      });
      _symList.forEach(element => {
        this.SelectCriteria(this.symList, element);
      });
      this._3Ex = false;
      this._2Ex = false;
      this._3Vg = true;
    }
  }
  videoChange(data) {
    this.video = data;
  }
  sealdChange(data) {
    this.sealdStone = data;
  }
  jewellerChoiceChange(data) {
    this.jewellerChoice = !this.jewellerChoice;
  }
  sarineDiamondJourneyChange(data) {
    this.sarineDiamondJourney = !this.sarineDiamondJourney;
  }
  ///Search Diamond
  GetFilterObject() {
    return {
      ShapeList: this.shapeList.list,
      ColorList: this.colorList.list,
      FancyColorList: this.fancycolorList.list,
      FancyOvertoneList: this.fancyOvertoneList.list,
      FancyIntensityList: this.fancyIntensityList.list,
      ClarityList: this.clarityList.list,
      CutList: this.cutList.list,
      PolishList: this.polishList.list,
      SymList: this.symList.list,
      LocationList: this.locationList.list,
      FlourenceList: this.flourenceList.list,
      MilkyList: this.milkyList.list,
      ShadeList: this.shadeList.list,
      BlackIncTblList: this.blackIncTblList.list,
      BlackIncCrnList: this.blackIncCrnList.list,
      WhiteIncTblList: this.whiteIncTblList.list,
      WhiteIncCrnList: this.whiteIncCrnList.list,
      CuletList: this.culetList.list,
      EyeCleanList: this.eyeCleanList.list,
      NaturalGirdleList: this.naturalGirdleList.list,
      NaturalPavList: this.naturalPavList.list,
      NaturalCrnList: this.naturalCrnList.list,
      ExtraFacetPavList: this.extraFacetPavList.list,
      ExtraFacetCrnList: this.extraFacetCrnList.list,
      FromgirdleList: this.fromgirdleList.list,
      TogirdleList: this.togirdleList.list,
      FromhaList: this.fromhaList.list,
      TohaList: this.tohaList.list,
      KeytoSymbolList: this.keytoSymbolList.list,
      CertificateList: this.certificateList.list,
      LusterList: this.lusterList.list,
      SelectedPointer: this.selectedPointer,
      FancyColor: this.fancyColor,
      FromPrice: this.fromPrice,
      ToPrice: this.toPrice,
      FromTotalPrice: this.fromTotalPrice,
      ToTotalPrice: this.toTotalPrice,
      FromLength: this.fromLength,
      ToLength: this.toLength,
      FromWidth: this.fromWidth,
      ToWidth: this.toWidth,
      FromDepth: this.fromDepth,
      ToDepth: this.toDepth,
      FromRatio: this.fromRatio,
      ToRatio: this.toRatio,
      FromTablePer: this.fromTablePer,
      ToTablePer: this.toTablePer,
      FromDepthPer: this.fromDepthPer,
      ToDepthPer: this.toDepthPer,
      FromGirdlePer: this.fromGirdlePer,
      ToGirdlePer: this.toGirdlePer,
      FromCrownHeight: this.fromCrownHeight,
      ToCrownHeight: this.toCrownHeight,
      FromPavDepth: this.fromPavDepth,
      ToPevDepth: this.toPevDepth,
      FromPavAngle: this.fromPavAngle,
      ToPevAngle: this.toPevAngle,
      FromCrownAngle: this.fromCrownAngle,
      ToCrownAngle: this.toCrownAngle,
      Video: this.video,
      SealdStone: this.sealdStone,
      KeytoSymbolContains: this.keytoSymbolContains,
      JewellerChoice: this.jewellerChoice,
      SarineDiamondJourney: this.sarineDiamondJourney,
      DelveryAt: this.delveryAt,
      PacketNos: this.PacketNos,
      Status: this.Status,
      IsPriority: this.IsPriority,
      IsRecentSearch: this.IsRecentSearch,
      PairSearch: this.PairSearch,
      isUpcommingSearch: this.isUpcommingSearch
    };
  }
  searchDiamond() {
    this.loader.show(true);
    var obj = this.GetFilterObject();
    this.searchService.Search(obj).subscribe(result => {
      this.showResult = true;
      this.loader.show(false);
      this.searchResult = result;
      this.calculateSummary();
      this.doPagination();
    }, error => {
      this.loader.show(false);
    })
    this.searchService.AddSearch(obj).subscribe(result => { }, error => { });
  }
  pairSearch() {
    this.PairSearch = true;
    this.searchDiamond();
  }
  noramlSearch() {
    this.PairSearch = false;
    this.searchDiamond();
  }
  SetFilterObject(filter) {
    this.searchService.GetSearch(filter).subscribe(item => {
      this.shapeList.list = item.shapeList;
      this.colorList.list = item.colorList;
      this.fancycolorList.list = item.fancyColorList;
      this.fancyOvertoneList.list = item.fancyOvertoneList;
      this.fancyIntensityList.list = item.fancyIntensityList;
      this.clarityList.list = item.clarityList;
      this.cutList.list = item.cutList;
      this.polishList.list = item.polishList
      this.symList.list = item.symList;
      this.locationList.list = item.locationList;
      this.flourenceList.list = item.flourenceList;
      this.milkyList.list = item.milkyList;
      this.shadeList.list = item.shadeList;
      this.blackIncTblList.list = item.blackIncTblList;
      this.blackIncCrnList.list = item.blackIncCrnList;
      this.whiteIncTblList.list = item.whiteIncTblList;
      this.whiteIncCrnList.list = item.whiteIncCrnList
      this.culetList.list = item.culetList;
      this.eyeCleanList.list = item.eyeCleanList;
      this.naturalGirdleList.list = item.naturalGirdleList;
      this.naturalPavList.list = item.naturalPavList;
      this.naturalCrnList.list = item.naturalCrnList;
      this.extraFacetPavList.list = item.extraFacetPavList;
      this.extraFacetCrnList.list = item.extraFacetCrnList;
      this.fromgirdleList.list = item.fromgirdleList;
      this.togirdleList.list = item.togirdleList;
      this.fromhaList.list = item.fromhaList;
      this.tohaList.list = item.tohaList;
      this.keytoSymbolList.list = item.keytoSymbolList;
      this.certificateList.list = item.certificateList;
      this.lusterList.list = item.lusterList;
      this.selectedPointer = item.selectedPointer;
      this.fancyColor = item.fancyColor;
      this.fromPrice = item.fromPrice;
      this.toPrice = item.toPrice;
      this.fromTotalPrice = item.fromTotalPrice;
      this.toTotalPrice = item.toTotalPrice;
      this.fromLength = item.fromLength;
      this.toLength = item.toLength;
      this.fromWidth = item.fromWidth;
      this.toWidth = item.toWidth;
      this.fromDepth = item.fromDepth;
      this.toDepth = item.toDepth;
      this.fromRatio = item.fromRatio;
      this.toRatio = item.toRatio;
      this.fromTablePer = item.fromTablePer;
      this.toTablePer = item.toTablePer;
      this.fromDepthPer = item.fromDepthPer;
      this.toDepthPer = item.toDepthPer;
      this.fromGirdlePer = item.fromGirdlePer;
      this.toGirdlePer = item.toGirdlePer;
      this.fromCrownHeight = item.fromCrownHeight;
      this.toCrownHeight = item.toCrownHeight;
      this.fromPavDepth = item.fromPavDepth;
      this.toPevDepth = item.toPevDepth;
      this.fromPavAngle = item.fromPavAngle;
      this.toPevAngle = item.toPevAngle;
      this.fromCrownAngle = item.fromCrownAngle;
      this.toCrownAngle = item.toCrownAngle;
      this.video = item.video;
      this.sealdStone = item.sealdStone;
      this.keytoSymbolContains = item.keytoSymbolContains;
      this.jewellerChoice = item.jewellerChoice;
      this.sarineDiamondJourney = item.sarineDiamondJourney;
      this.delveryAt = item.delveryAt;
      this.PacketNos = (item.packetNos != "" && item.packetNos != undefined ? item.packetNos.replace("'", "") : "");
      this.Status = item.status;
      this.IsPriority = item.isPriority;
      this.searchDiamond();
      this.reshapeLists();
    });


  }
  ModifyFilterObject(filter) {
    this.searchService.GetSearch(filter).subscribe(item => {
      this.shapeList.list = item.shapeList;

      this.colorList.list = item.colorList;
      this.fancycolorList.list = item.fancyColorList;
      this.fancyOvertoneList.list = item.fancyOvertoneList;
      this.fancyIntensityList.list = item.fancyIntensityList;
      this.clarityList.list = item.clarityList;
      this.cutList.list = item.cutList;
      this.polishList.list = item.polishList
      this.symList.list = item.symList;
      this.locationList.list = item.locationList;
      this.flourenceList.list = item.flourenceList;
      this.milkyList.list = item.milkyList;
      this.shadeList.list = item.shadeList;
      this.blackIncTblList.list = item.blackIncTblList;
      this.blackIncCrnList.list = item.blackIncCrnList;
      this.whiteIncTblList.list = item.whiteIncTblList;
      this.whiteIncCrnList.list = item.whiteIncCrnList
      this.culetList.list = item.culetList;
      this.eyeCleanList.list = item.eyeCleanList;
      this.naturalGirdleList.list = item.naturalGirdleList;
      this.naturalPavList.list = item.naturalPavList;
      this.naturalCrnList.list = item.naturalCrnList;
      this.extraFacetPavList.list = item.extraFacetPavList;
      this.extraFacetCrnList.list = item.extraFacetCrnList;
      this.fromgirdleList.list = item.fromgirdleList;
      this.togirdleList.list = item.togirdleList;
      this.fromhaList.list = item.fromhaList;
      this.tohaList.list = item.tohaList;
      this.keytoSymbolList.list = item.keytoSymbolList;
      this.certificateList.list = item.certificateList;
      this.lusterList.list = item.lusterList;
      this.selectedPointer = item.selectedPointer;
      this.fancyColor = item.fancyColor;
      this.fromPrice = item.fromPrice;
      this.toPrice = item.toPrice;
      this.fromTotalPrice = item.fromTotalPrice;
      this.toTotalPrice = item.toTotalPrice;
      this.fromLength = item.fromLength;
      this.toLength = item.toLength;
      this.fromWidth = item.fromWidth;
      this.toWidth = item.toWidth;
      this.fromDepth = item.fromDepth;
      this.toDepth = item.toDepth;
      this.fromRatio = item.fromRatio;
      this.toRatio = item.toRatio;
      this.fromTablePer = item.fromTablePer;
      this.toTablePer = item.toTablePer;
      this.fromDepthPer = item.fromDepthPer;
      this.toDepthPer = item.toDepthPer;
      this.fromGirdlePer = item.fromGirdlePer;
      this.toGirdlePer = item.toGirdlePer;
      this.fromCrownHeight = item.fromCrownHeight;
      this.toCrownHeight = item.toCrownHeight;
      this.fromPavDepth = item.fromPavDepth;
      this.toPevDepth = item.toPevDepth;
      this.fromPavAngle = item.fromPavAngle;
      this.toPevAngle = item.toPevAngle;
      this.fromCrownAngle = item.fromCrownAngle;
      this.toCrownAngle = item.toCrownAngle;
      this.video = item.video;
      this.sealdStone = item.sealdStone;
      this.keytoSymbolContains = item.keytoSymbolContains;
      this.jewellerChoice = item.jewellerChoice;
      this.sarineDiamondJourney = item.sarineDiamondJourney;
      this.delveryAt = item.delveryAt;
      this.PacketNos = (item.packetNos != "" && item.packetNos != undefined ? item.packetNos.replace("'", "") : "");
      this.Status = item.status;
      this.IsPriority = item.isPriority;
      this.reshapeLists();

    });


  }
  ModifyFilterObjectByAccess(filter) {
    this.searchService.GetSearch(filter).subscribe(item => {
      this.shapeList.list = item.shapeList;

      this.colorList.list = item.colorList;
      this.fancycolorList.list = item.fancyColorList;
      this.fancyOvertoneList.list = item.fancyOvertoneList;
      this.fancyIntensityList.list = item.fancyIntensityList;
      this.clarityList.list = item.clarityList;
      this.cutList.list = item.cutList;
      this.polishList.list = item.polishList
      this.symList.list = item.symList;
      this.locationList.list = item.locationList;
      this.flourenceList.list = item.flourenceList;
      this.milkyList.list = item.milkyList;
      this.shadeList.list = item.shadeList;
      this.blackIncTblList.list = item.blackIncTblList;
      this.blackIncCrnList.list = item.blackIncCrnList;
      this.whiteIncTblList.list = item.whiteIncTblList;
      this.whiteIncCrnList.list = item.whiteIncCrnList
      this.culetList.list = item.culetList;
      this.eyeCleanList.list = item.eyeCleanList;
      this.naturalGirdleList.list = item.naturalGirdleList;
      this.naturalPavList.list = item.naturalPavList;
      this.naturalCrnList.list = item.naturalCrnList;
      this.extraFacetPavList.list = item.extraFacetPavList;
      this.extraFacetCrnList.list = item.extraFacetCrnList;
      this.fromgirdleList.list = item.fromgirdleList;
      this.togirdleList.list = item.togirdleList;
      this.fromhaList.list = item.fromhaList;
      this.tohaList.list = item.tohaList;
      this.keytoSymbolList.list = item.keytoSymbolList;
      this.certificateList.list = item.certificateList;
      this.lusterList.list = item.lusterList;
      this.selectedPointer = item.selectedPointer;
      this.fancyColor = item.fancyColor;
      this.fromPrice = item.fromPrice;
      this.toPrice = item.toPrice;
      this.fromTotalPrice = item.fromTotalPrice;
      this.toTotalPrice = item.toTotalPrice;
      this.fromLength = item.fromLength;
      this.toLength = item.toLength;
      this.fromWidth = item.fromWidth;
      this.toWidth = item.toWidth;
      this.fromDepth = item.fromDepth;
      this.toDepth = item.toDepth;
      this.fromRatio = item.fromRatio;
      this.toRatio = item.toRatio;
      this.fromTablePer = item.fromTablePer;
      this.toTablePer = item.toTablePer;
      this.fromDepthPer = item.fromDepthPer;
      this.toDepthPer = item.toDepthPer;
      this.fromGirdlePer = item.fromGirdlePer;
      this.toGirdlePer = item.toGirdlePer;
      this.fromCrownHeight = item.fromCrownHeight;
      this.toCrownHeight = item.toCrownHeight;
      this.fromPavDepth = item.fromPavDepth;
      this.toPevDepth = item.toPevDepth;
      this.fromPavAngle = item.fromPavAngle;
      this.toPevAngle = item.toPevAngle;
      this.fromCrownAngle = item.fromCrownAngle;
      this.toCrownAngle = item.toCrownAngle;
      this.video = item.video;
      this.sealdStone = item.sealdStone;
      this.keytoSymbolContains = item.keytoSymbolContains;
      this.jewellerChoice = item.jewellerChoice;
      this.sarineDiamondJourney = item.sarineDiamondJourney;
      this.delveryAt = item.delveryAt;
      this.PacketNos = (item.packetNos != "" && item.packetNos != undefined ? item.packetNos.replace("'", "") : "");
      this.Status = item.status;
      this.IsPriority = item.isPriority;
      this.reshapeLists();
      if(this.selectedPointer.length > 0){
        this.hideDefualtPointer=true;
      }
    });
  }
  reshapeLists() {
    this.shapeList.allSelected = this.shapeList.list.filter(x => x.selected == true).length <= 0;
    this.colorList.allSelected = this.colorList.list.filter(x => x.selected == true).length <= 0;
    this.clarityList.allSelected = this.clarityList.list.filter(x => x.selected == true).length <= 0;
    this.fancycolorList.allSelected = this.fancycolorList.list.filter(x => x.selected == true).length <= 0;
    this.fancyIntensityList.allSelected = this.fancyIntensityList.list.filter(x => x.selected == true).length <= 0;
    this.fancyOvertoneList.allSelected = this.fancyOvertoneList.list.filter(x => x.selected == true).length <= 0;
    this.cutList.allSelected = this.cutList.list.filter(x => x.selected == true).length <= 0;
    this.symList.allSelected = this.symList.list.filter(x => x.selected == true).length <= 0;
    this.tohaList.allSelected = this.tohaList.list.filter(x => x.selected == true).length <= 0;
    this.culetList.allSelected = this.culetList.list.filter(x => x.selected == true).length <= 0;
    this.milkyList.allSelected = this.milkyList.list.filter(x => x.selected == true).length <= 0;
    this.shadeList.allSelected = this.shadeList.list.filter(x => x.selected == true).length <= 0;
    this.lusterList.allSelected = this.lusterList.list.filter(x => x.selected == true).length <= 0;
    this.fromhaList.allSelected = this.fromhaList.list.filter(x => x.selected == true).length <= 0;
    this.polishList.allSelected = this.polishList.list.filter(x => x.selected == true).length <= 0;
    this.locationList.allSelected = this.locationList.list.filter(x => x.selected == true).length <= 0;
    this.eyeCleanList.allSelected = this.eyeCleanList.list.filter(x => x.selected == true).length <= 0;
    this.togirdleList.allSelected = this.togirdleList.list.filter(x => x.selected == true).length <= 0;
    this.flourenceList.allSelected = this.flourenceList.list.filter(x => x.selected == true).length <= 0;
    this.fromgirdleList.allSelected = this.fromgirdleList.list.filter(x => x.selected == true).length <= 0;
    this.naturalCrnList.allSelected = this.naturalCrnList.list.filter(x => x.selected == true).length <= 0;
    this.naturalPavList.allSelected = this.naturalPavList.list.filter(x => x.selected == true).length <= 0;
    this.blackIncCrnList.allSelected = this.blackIncCrnList.list.filter(x => x.selected == true).length <= 0;
    this.blackIncTblList.allSelected = this.blackIncTblList.list.filter(x => x.selected == true).length <= 0;
    this.certificateList.allSelected = this.certificateList.list.filter(x => x.selected == true).length <= 0;
    this.keytoSymbolList.allSelected = this.keytoSymbolList.list.filter(x => x.selected == true).length <= 0;
    this.whiteIncCrnList.allSelected = this.whiteIncCrnList.list.filter(x => x.selected == true).length <= 0;
    this.whiteIncTblList.allSelected = this.whiteIncTblList.list.filter(x => x.selected == true).length <= 0;
    this.naturalGirdleList.allSelected = this.naturalGirdleList.list.filter(x => x.selected == true).length <= 0;
    this.extraFacetCrnList.allSelected = this.extraFacetCrnList.list.filter(x => x.selected == true).length <= 0;
    this.extraFacetPavList.allSelected = this.extraFacetPavList.list.filter(x => x.selected == true).length <= 0;
  }
  backtoSearch() {
    this.showResult = false;
    this.PacketNos = '';
    if (this.shapeList.list.length <= 0)
      this.LoadDbParameter();
    this.IsRecentSearch = false;
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
    this.searchDiamond();
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
  AddtoCart(item: diamondsearchResult) {
    var cartItem = new CartModel();
    cartItem.back = item.back;
    cartItem.price = item.price;
    cartItem.packetNo = item.packetNo;
    cartItem.deliveryAt = this.delveryAt;
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
  AddtoCartMultiple() {
    var selectedPackets = this.searchResult.filter(x => x.selected);
    if (selectedPackets.length > 0) {
      selectedPackets.forEach(item => {
        var cartItem = new CartModel();
        cartItem.back = item.back;
        cartItem.price = item.price;
        cartItem.packetNo = item.packetNo;
        cartItem.deliveryAt = this.delveryAt;
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
      });
    }
  }
  cartCount: number = 0;
  LoadCart() {
    this.cartService.GetAll().subscribe(result => {
      this.cartCount = result.length;
    })
  }
  markup: number;
  ExportType: string = "Download";
  emailformgroup: FormGroup;

  emailModel: ExportToEmailModel;
  submited: boolean = false;
  downloadFormat: UserDownloadMasterModel[] = [];
  selectedDownloadFormat: UserDownloadMasterModel;
  Export(content) {
    this.emailModel = new ExportToEmailModel();
    this.emailModel.subject = "CD-Stock";
    this.userService.GetUser().subscribe(result => {
      this.emailModel.mailTo = result.emailId;
      this.emailModel.message = `Hello ` + result.userBasicInfo.firstName + `
Greetings of the day `;
    });
    this.downloadService.LoadFields().subscribe(result => {
      this.downloadFormat = result;
      this.selectedDownloadFormat = this.downloadFormat[0];
    }, error => { })
    this.emailformgroup = new FormGroup({
      subject: new FormControl('', Validators.required),
      mailTo: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      mailCC: new FormControl('', Validators.compose([Validators.email])),
      message: new FormControl('', Validators.required)
    });
    this.modalService.open(content, { size: "lg", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.DownloadResult();
    }, (reason) => {

    });
  }
  selectDownloadFormat(item) {
    this.selectedDownloadFormat = item;
  }
  DownloadResult() {
    var strPacketNos = "";
    if (this.ExportType == "DownloadSelected") {

      this.searchResult.forEach(element => {
        if (element.selected) {
          if (strPacketNos == "") {
            strPacketNos = element.packetNo;
          } else {
            strPacketNos = strPacketNos + "," + element.packetNo;
          }
        }
      });
      if (strPacketNos == "") {
        this.alertService.Error("Please select packetNo", "");
        return;
      }
    }
    var objFilter = {
      ShapeList: this.shapeList.list,
      ColorList: this.colorList.list,
      FancyColorList: this.fancycolorList.list,
      FancyOvertoneList: this.fancyOvertoneList.list,
      FancyIntensityList: this.fancyIntensityList.list,
      ClarityList: this.clarityList.list,
      CutList: this.cutList.list,
      PolishList: this.polishList.list,
      SymList: this.symList.list,
      LocationList: this.locationList.list,
      FlourenceList: this.flourenceList.list,
      MilkyList: this.milkyList.list,
      ShadeList: this.shadeList.list,
      BlackIncTblList: this.blackIncTblList.list,
      BlackIncCrnList: this.blackIncCrnList.list,
      WhiteIncTblList: this.whiteIncTblList.list,
      WhiteIncCrnList: this.whiteIncCrnList.list,
      CuletList: this.culetList.list,
      EyeCleanList: this.eyeCleanList.list,
      NaturalGirdleList: this.naturalGirdleList.list,
      NaturalPavList: this.naturalPavList.list,
      NaturalCrnList: this.naturalCrnList.list,
      ExtraFacetPavList: this.extraFacetPavList.list,
      ExtraFacetCrnList: this.extraFacetCrnList.list,
      FromgirdleList: this.fromgirdleList.list,
      TogirdleList: this.togirdleList.list,
      FromhaList: this.fromhaList.list,
      TohaList: this.tohaList.list,
      KeytoSymbolList: this.keytoSymbolList.list,
      CertificateList: this.certificateList.list,
      LusterList: this.lusterList.list,
      SelectedPointer: this.selectedPointer,
      FancyColor: this.fancyColor,
      FromPrice: this.fromPrice,
      ToPrice: this.toPrice,
      FromTotalPrice: this.fromTotalPrice,
      ToTotalPrice: this.toTotalPrice,
      FromLength: this.fromLength,
      ToLength: this.toLength,
      FromWidth: this.fromWidth,
      ToWidth: this.toWidth,
      FromDepth: this.fromDepth,
      ToDepth: this.toDepth,
      FromRatio: this.fromRatio,
      ToRatio: this.toRatio,
      FromTablePer: this.fromTablePer,
      ToTablePer: this.toTablePer,
      FromDepthPer: this.fromDepthPer,
      ToDepthPer: this.toDepthPer,
      FromGirdlePer: this.fromGirdlePer,
      ToGirdlePer: this.toGirdlePer,
      FromCrownHeight: this.fromCrownHeight,
      ToCrownHeight: this.toCrownHeight,
      FromPavDepth: this.fromPavDepth,
      ToPevDepth: this.toPevDepth,
      FromPavAngle: this.fromPavAngle,
      ToPevAngle: this.toPevAngle,
      FromCrownAngle: this.fromCrownAngle,
      ToCrownAngle: this.toCrownAngle,
      Video: this.video,
      SealdStone: this.sealdStone,
      KeytoSymbolContains: this.keytoSymbolContains,
      JewellerChoice: this.jewellerChoice,
      SarineDiamondJourney: this.sarineDiamondJourney,
      DelveryAt: this.delveryAt,
      PacketNos: (strPacketNos == "" ? this.PacketNos : strPacketNos),
      Status: this.Status,
      IsPriority: this.IsPriority,
      IsRecentSearch: this.IsRecentSearch,
      Percentage: this.markup,
      PairSearch: this.PairSearch
    };
    var obj = {
      filter: objFilter,
      UserDownload: this.selectedDownloadFormat
    }

    this.loader.show(true);
    this.downloadService.Download(obj).subscribe(result => {
      this.loader.show(false);
      window.open(result.path, "_blank");
    }, error => {
      this.loader.show(false);
    });
  }
  sendEmail() {
    this.submited = true;
    if (this.emailformgroup.valid) {
      var strPacketNos = "";
      if (this.ExportType == "DownloadSelected") {

        this.searchResult.forEach(element => {
          if (element.selected) {
            if (strPacketNos == "") {
              strPacketNos = element.packetNo;
            } else {
              strPacketNos = strPacketNos + "," + element.packetNo;
            }
          }
        });
        if (strPacketNos == "") {
          this.alertService.Error("Please select packetNo", "");
          return;
        }
      }
      var obj = {
        ShapeList: this.shapeList.list,
        ColorList: this.colorList.list,
        FancyColorList: this.fancycolorList.list,
        FancyOvertoneList: this.fancyOvertoneList.list,
        FancyIntensityList: this.fancyIntensityList.list,
        ClarityList: this.clarityList.list,
        CutList: this.cutList.list,
        PolishList: this.polishList.list,
        SymList: this.symList.list,
        LocationList: this.locationList.list,
        FlourenceList: this.flourenceList.list,
        MilkyList: this.milkyList.list,
        ShadeList: this.shadeList.list,
        BlackIncTblList: this.blackIncTblList.list,
        BlackIncCrnList: this.blackIncCrnList.list,
        WhiteIncTblList: this.whiteIncTblList.list,
        WhiteIncCrnList: this.whiteIncCrnList.list,
        CuletList: this.culetList.list,
        EyeCleanList: this.eyeCleanList.list,
        NaturalGirdleList: this.naturalGirdleList.list,
        NaturalPavList: this.naturalPavList.list,
        NaturalCrnList: this.naturalCrnList.list,
        ExtraFacetPavList: this.extraFacetPavList.list,
        ExtraFacetCrnList: this.extraFacetCrnList.list,
        FromgirdleList: this.fromgirdleList.list,
        TogirdleList: this.togirdleList.list,
        FromhaList: this.fromhaList.list,
        TohaList: this.tohaList.list,
        KeytoSymbolList: this.keytoSymbolList.list,
        CertificateList: this.certificateList.list,
        LusterList: this.lusterList.list,
        SelectedPointer: this.selectedPointer,
        FancyColor: this.fancyColor,
        FromPrice: this.fromPrice,
        ToPrice: this.toPrice,
        FromTotalPrice: this.fromTotalPrice,
        ToTotalPrice: this.toTotalPrice,
        FromLength: this.fromLength,
        ToLength: this.toLength,
        FromWidth: this.fromWidth,
        ToWidth: this.toWidth,
        FromDepth: this.fromDepth,
        ToDepth: this.toDepth,
        FromRatio: this.fromRatio,
        ToRatio: this.toRatio,
        FromTablePer: this.fromTablePer,
        ToTablePer: this.toTablePer,
        FromDepthPer: this.fromDepthPer,
        ToDepthPer: this.toDepthPer,
        FromGirdlePer: this.fromGirdlePer,
        ToGirdlePer: this.toGirdlePer,
        FromCrownHeight: this.fromCrownHeight,
        ToCrownHeight: this.toCrownHeight,
        FromPavDepth: this.fromPavDepth,
        ToPevDepth: this.toPevDepth,
        FromPavAngle: this.fromPavAngle,
        ToPevAngle: this.toPevAngle,
        FromCrownAngle: this.fromCrownAngle,
        ToCrownAngle: this.toCrownAngle,
        Video: this.video,
        SealdStone: this.sealdStone,
        KeytoSymbolContains: this.keytoSymbolContains,
        JewellerChoice: this.jewellerChoice,
        SarineDiamondJourney: this.sarineDiamondJourney,
        DelveryAt: this.delveryAt,
        PacketNos: (strPacketNos == "" ? this.PacketNos : strPacketNos),
        Status: this.Status,
        IsPriority: this.IsPriority,
        IsRecentSearch: this.IsRecentSearch,
        Percentage: this.markup
      };
      this.emailModel.filter = obj;
      this.emailModel.UserDownload = this.selectedDownloadFormat;
      this.loader.show(true);
      this.downloadService.SendEmail(this.emailModel).subscribe(result => {
        this.loader.show(false);
        if (result.status) {
          this.alertService.success("", this.translate.instant(result.message));
          this.modalService.dismissAll();
        }
      }, error => {
        this.loader.show(false);
        this.alertService.Error("", this.translate.instant("inventory.search.result.error"));
        try {
          this.formvalidationService.BindServerErrors(this.emailformgroup, error);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
  commentformgroup: FormGroup;
  commentModel: DiamondCommentModel;
  diamondComments: DiamondCommentModel[];
  LoadComment(content, PacketNo: string) {
    this.LoadCommentData(PacketNo);
    this.commentModel = new DiamondCommentModel();
    this.commentModel.packetNo = PacketNo;
    this.commentformgroup = new FormGroup({
      packetNo: new FormControl(PacketNo, Validators.required),
      comment: new FormControl('', Validators.required),
    });
    this.modalService.open(content, { size: "lg", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  LoadCommentData(PacketNo: string) {
    this.loader.show(true);
    this.diamondCommentService.Load(PacketNo).subscribe(result => {
      this.loader.show(false);
      this.diamondComments = result;
    }, error => {
      this.loader.show(false);
    })
  }
  saveComment() {
    this.submited = true;
    if (this.commentformgroup.valid) {
      this.loader.show(true);
      this.diamondCommentService.Save(this.commentModel).subscribe(result => {
        this.loader.show(false);
        if (result.status) {
          this.alertService.success("", this.translate.instant(result.message));
          this.modalService.dismissAll();
        }
      }, error => {
        this.loader.show(false);
        this.alertService.Error("", this.translate.instant("inventory.search.result.error"));
        try {
          this.formvalidationService.BindServerErrors(this.commentformgroup, error);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
  offerDiamonds: diamondsearchResult[] = [];
  LoadOfferModel(content) {
    this.offerDiamonds = JSON.parse(JSON.stringify(this.searchResult.filter(x => x.selected)));
    this.offerDiamonds.forEach(element => {
      element._offerBack = element.back;
      element._offerPrice = element.price;
      element.selected = false;
      element.deliveryAt = this.delveryAt;
      element.showDetail = false;
    });
    if (this.offerDiamonds.length > 0) {

      this.modalService.open(content, { backdrop: "static", size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      }, (reason) => {

      });
    }
  }
  inquiryDiamonds: diamondsearchResult[] = [];
  LoadInquiryModel(content) {
    this.inquiryDiamonds = JSON.parse(JSON.stringify(this.searchResult.filter(x => x.selected)));
    this.inquiryDiamonds.forEach(element => {
      element.selected = false;
      element.deliveryAt = this.delveryAt;
      element.showDetail = false;
    });
    if (this.inquiryDiamonds.length > 0) {

      this.modalService.open(content, { backdrop: "static", size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      }, (reason) => {

      });
    }
  }
  LoadSaveSearchModel(content) {
    if (this.currentSearch == undefined || this.currentSearch == null) {
      this.currentSearch = new UserSearchModel();
    }
    this.modalService.open(content, { backdrop: "static", size: "sm", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  saveSearch() {
    this.submited = true;

    this.loader.show(true);
    var item = {
      filter: this.GetFilterObject(),
      model: this.currentSearch
    };
    this.userSaveSearchService.AddSearch(item).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.alertService.success("", this.translate.instant("inventory.search.result.success"));
        this.modalService.dismissAll();
      }
    }, error => {
      this.loader.show(false);
      this.alertService.Error("", this.translate.instant("inventory.search.result.error"));
      try {
        this.formvalidationService.BindServerErrors(this.commentformgroup, error);
      } catch (error) {
        console.log(error);
      }
    });

  }
  wishList: UserWishModel[] = [];
  NewWishName: string;
  wishId: number;
  LoadUserWishModal(content) {
    this.loader.show(true);
    if (this.currentWish != null && this.currentWish != undefined) {
      if (this.currentWish.parentId > 0)
        this.NewWishName = this.currentWish.label;
    }
    this.userWishService.LoadSearch().subscribe(result => { this.loader.show(false); this.wishList = result; }, error => { this.loader.show(false); });
    if (this.currentWish == undefined || this.currentWish == null) {
      this.currentWish = new UserWishModel();
    }
    this.modalService.open(content, { backdrop: "static", size: "lg", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  saveUserWish() {
    this.submited = true;
    var wish: UserWishModel = new UserWishModel();
    if ((this.NewWishName == null || this.NewWishName == undefined || this.NewWishName == "") && (this.wishId <= 0 || this.wishId == undefined || this.wishId == null)) {
      this.alertService.Error(this.translate.instant("inventory.profile.userWish.wishName_error"), "");
      return;
    }
    if (this.NewWishName == null || this.NewWishName == undefined || this.NewWishName == "") {
      wish = this.wishList.filter(x => x.id == this.wishId)[0];
    } else {
      var _item = this.wishList.filter(x => x.id == this.wishId)[0];
      if (_item != undefined && _item != null)
        wish.id = this.currentWish.id;
      wish.label = this.NewWishName;
      wish.parentId = this.wishId;
    }
    this.loader.show(true);
    var item = {
      filter: this.GetFilterObject(),
      model: wish
    };
    this.userWishService.AddSearch(item).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.alertService.success("", this.translate.instant("inventory.search.result.success"));
        this.modalService.dismissAll();
      }
    }, error => {
      this.loader.show(false);
      this.alertService.Error("", this.translate.instant("inventory.search.result.error"));
      try {
        this.formvalidationService.BindServerErrors(this.commentformgroup, error);
      } catch (error) {
        console.log(error);
      }
    });

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
  TrackDiamonds: diamondsearchResult[] = [];
  LoadTrackModel(content) {
    this.TrackDiamonds = JSON.parse(JSON.stringify(this.searchResult.filter(x => x.selected)));
    this.TrackDiamonds.forEach(element => {
      element.selected = false;
      element.deliveryAt = this.delveryAt;
      element.showDetail = false;
    });
    if (this.TrackDiamonds.length > 0) {

      this.modalService.open(content, { backdrop: "static", size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      }, (reason) => {

      });
    } else {
      this.alertService.Error(this.translate.instant("inventory.profile.diamondTrack.selectDiamonderror"), "");
    }
  }
  scheduleformgroup: FormGroup;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };
  countrydropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };
  daysDropdownList = [];
  daysSelectedItems = [];
  countrySelectedItem = [];
  countryList = [];
  LoadScheduleModal(content) {
    this.daysDropdownList = [
      { item_id: "Sunday", item_text: 'Sunday' },
      { item_id: "Monday", item_text: 'Monday' },
      { item_id: "Tuesday", item_text: 'Tuesday' },
      { item_id: "Wednesday", item_text: 'Wednesday' },
      { item_id: "Thursday", item_text: 'Thursday' },
      { item_id: "Friday", item_text: 'Friday' },
      { item_id: "Saturday", item_text: 'Saturday' }
    ];
    if (this.currentSchedule == undefined || this.currentSchedule == null) {
      this.currentSchedule = new ScheduleModel();
      this.currentSchedule.scheduleType = "Daily";
      this.currentSchedule.typeOfSchedule = "Daily";
    }

    if (this.currentSchedule.scheduleType == "Daily") {
      this.currentSchedule.typeOfSchedule = "Daily";
    } else {
      this.daysSelectedItems = [];
      this.currentSchedule.typeOfSchedule = "Weekly";
      if (this.currentSchedule.scheduleType != undefined && this.currentSchedule.scheduleType != null) {
        this.currentSchedule.scheduleType.split(",").forEach(element => {
          if (this.daysDropdownList.filter(x => x.item_id == element).length > 0) {
            this.daysSelectedItems.push(this.daysDropdownList.filter(x => x.item_id == element)[0]);
          }
        });
      }
    }
    this.countrySelectedItem = [];
    this.countryList.forEach(element => {
      if (element.id == this.currentSchedule.countryId) {
        this.countrySelectedItem.push(element);
      }
    });
    this.scheduleformgroup = new FormGroup({
      scheduleName: new FormControl('', Validators.required),
      isActive: new FormControl('', Validators.compose([Validators.email])),
      additionalEmailId: new FormControl('', Validators.compose([Validators.email])),
      additionalPer: new FormControl(''),
      isNewStock: new FormControl(''),
      bccEmailId: new FormControl('', Validators.compose([Validators.email])),
      notifyCopyEmail: new FormControl(''),
      typeOfSchedule: new FormControl(''),
      daysSelectedItems: new FormControl(this.daysSelectedItems),
      countrySelectedItem: new FormControl(this.countrySelectedItem)
    });
    this.modalService.open(content, { backdrop: "static", size: "lg", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  toggleTypeOfSchedule() {
    if (this.currentSchedule.typeOfSchedule == "Daily") {
      this.currentSchedule.typeOfSchedule = "Weekly";
    } else {
      this.currentSchedule.typeOfSchedule = "Daily";
    }
  }
  saveSchedule() {
    this.submited = true;
    this.loader.show(true);
    if (this.currentSchedule.typeOfSchedule == "Daily") {
      this.currentSchedule.scheduleType = "Daily";
    } else {
      this.currentSchedule.scheduleType = "";
      this.daysSelectedItems.forEach(element => {
        if (this.currentSchedule.scheduleType == "") {
          this.currentSchedule.scheduleType = element.item_id;
        } else {
          this.currentSchedule.scheduleType += "," + element.item_id;
        }
      });
    }
    this.currentSchedule.countryId = this.countrySelectedItem[0].id;
    var item = {
      filter: this.GetFilterObject(),
      model: this.currentSchedule
    };
    this.scheduleService.AddSearch(item).subscribe(result => {
      this.loader.show(false);
      if (result.status) {
        this.alertService.success("", this.translate.instant("inventory.search.result.success"));
        this.modalService.dismissAll();
      }
    }, error => {
      this.loader.show(false);
      this.alertService.Error("", this.translate.instant("inventory.search.result.error"));
      try {
        this.formvalidationService.BindServerErrors(this.commentformgroup, error);
      } catch (error) {
        console.log(error);
      }
    });

  }
  InquirySave(data) {
    this.searchDiamond();
  }
  HoldSave(data) {
    this.searchDiamond();
  }
  ConfirmSave(data) {
    this.searchDiamond();
  }
  packetNo: string;
  LoadDetail(content, PacketNo: string) {
    this.packetNo = PacketNo;
    this.modalService.open(content, { size: "xl", ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

}
