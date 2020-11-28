import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { EntityModel } from '../../models/entity.model';
import { EntityService } from '../../service/entity.service';
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
    , private route: ActivatedRoute) { }
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
  girdleList: any;
  haList: any;
  keytoSymbolList: any;
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
  catchRouteParam() {
    if (-1 != this.router.url.indexOf("fancySearch")) {
      this.fancyColor = true;
    }
    // this.route
    //   .queryParams
    //   .subscribe(params => {
    //     try {
    //       var color = params['color'];
    //       if (color == undefined)
    //         return;
    //       if(color=="fancy")
    //         this.fancyColor=true;
    //     } catch (error) {

    //     }
    //   });
  }
  ngOnInit(): void {
    this.catchRouteParam();
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
    this.girdleList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.haList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.keytoSymbolList = {
      allSelected: true,
      selectedOther: false,
      list: []
    };
    this.loader.show(true);
    this.entityService.GetEntity("Shape").subscribe(result => {
      this.loader.show(false);
      this.shapeList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("Colour").subscribe(result => {
      this.loader.show(false);
      this.colorList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("Clarity").subscribe(result => {
      this.loader.show(false);
      this.clarityList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("cut").subscribe(result => {
      this.loader.show(false);
      this.cutList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("polish").subscribe(result => {
      this.loader.show(false);
      this.polishList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("Symmetry").subscribe(result => {
      this.loader.show(false);
      this.symList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("Location").subscribe(result => {
      this.loader.show(false);
      this.locationList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("FancyColor").subscribe(result => {
      this.loader.show(false);
      this.fancycolorList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("FancyColorOvertone").subscribe(result => {
      this.loader.show(false);
      this.fancyOvertoneList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("FancyColorIntensity").subscribe(result => {
      this.loader.show(false);
      this.fancyIntensityList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("Flourence").subscribe(result => {
      this.loader.show(false);
      this.flourenceList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("shade").subscribe(result => {
      this.loader.show(false);
      this.shadeList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("milky").subscribe(result => {
      this.loader.show(false);
      this.milkyList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("Lusture").subscribe(result => {
      this.loader.show(false);
      this.lusterList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("BlackCrown").subscribe(result => {
      this.loader.show(false);
      this.blackIncCrnList.list = result;
      this.whiteIncCrnList.list = JSON.parse(JSON.stringify(result));
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("BlackTable").subscribe(result => {
      this.loader.show(false);
      this.blackIncTblList.list = result;
      this.whiteIncTblList.list = JSON.parse(JSON.stringify(result));
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("Culet").subscribe(result => {
      this.loader.show(false);
      this.culetList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("ExtraFacetCrown").subscribe(result => {
      this.loader.show(false);
      this.extraFacetCrnList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("ExtraFacetPavilion").subscribe(result => {
      this.loader.show(false);
      this.extraFacetPavList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("EyeClean").subscribe(result => {
      this.loader.show(false);
      this.eyeCleanList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("NaturalGirdle").subscribe(result => {
      this.loader.show(false);
      this.naturalGirdleList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("NaturalPavilion").subscribe(result => {
      this.loader.show(false);
      this.naturalPavList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("NaturalCrown").subscribe(result => {
      this.loader.show(false);
      this.naturalCrnList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("Girdle").subscribe(result => {
      this.loader.show(false);
      this.girdleList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetEntity("HNA").subscribe(result => {
      this.loader.show(false);
      this.haList.list = result;
    }, error => {
      this.loader.show(false);
    })
    this.entityService.GetAdvanceEntity("Keytosymbol").subscribe(result => {
      this.loader.show(false);
      this.keytoSymbolList.list = result;
    }, error => {
      this.loader.show(false);
    })
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
      this.defaultCaratRange[j].selected=false;
      const subElement = this.defaultCaratRange[j];
      for (let k = 0; k < subElement.list.length; k++) {
        subElement.list[k].selected=false;;
      } 
    }
  }
  addPointer() {
    if (this.fromCarat != 0 && this.toCarat != 0) {
      var newPointerList = [];
      var flag = true;
      for (let index = 0; index < this.selectedPointer.length; index++) {
        const element = this.selectedPointer[index];
        if (this.fromCarat >= element.from && this.fromCarat <= element.to) {
          flag = false;
        } else if (this.toCarat >= element.from && this.toCarat <= element.to) {
          flag = false;
        }
      }
      if (flag == true) {
        this.selectedPointer.push({ from: this.fromCarat, to: this.toCarat });
      }
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
  select2Ex() {

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
  select3VG() {

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
}
