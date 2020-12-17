import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { diamondsearchResult } from '../../models/diamond.result.model';
import { EntityService } from '../../service/entity.service';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'lib-diamond-detail',
  templateUrl: './diamond-detail.component.html',
  styleUrls: ['./diamond-detail.component.css']
})
export class DiamondDetailComponent implements OnInit {

  constructor(private loader: loaderserice
    , private router: Router
    , private alertService: alertserice
    , public translate: TranslateService
    , private formvalidationService: FormValidationService
    , private entityService: EntityService
    , private route: ActivatedRoute
    , private searchService: SearchService
    , private dom: DomSanitizer) { }
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
  ngOnInit(): void {
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
    this.PacketNos = localStorage.getItem("detailPacketNo");
    this.searchDiamond();
  }
  searchDiamond() {
    this.loader.show(true);
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
      PacketNos: this.PacketNos,
      Status: this.Status,
      IsPriority: this.IsPriority
    }
    this.searchService.Search(obj).subscribe(result => {
      this.showResult = true;
      this.loader.show(false);
      this.searchResult = result;
      this.myUrl = this.dom.bypassSecurityTrustResourceUrl(this.searchResult[0].videoCD)
    }, error => {
      this.loader.show(false);
    })
  }
  myUrl:any;
}
