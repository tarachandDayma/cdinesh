import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, FormValidationService, loaderserice } from 'service-common';
import { EntityModel } from '../../models/entity.model';
import { EntityService } from '../../service/entity.service';
@Component({
  selector: 'lib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loader: loaderserice
    , private router: Router
    , private alertService: alertserice
    , public translate: TranslateService
    , private formvalidationService: FormValidationService
    , private entityService: EntityService) { }
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
  flourenceList:any;
  caratRange: any;
  defaultCaratRange: any[];
  fromCarat: number;
  toCarat: number;
  selectedPointer: any[];
  showMorePointer: boolean = false;
  fancyColor: boolean = false;
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
            to: "0.179"
          }, {
            selected: false,
            from: "0.180",
            to: "0.229"
          }, {
            selected: false,
            from: "0.230",
            to: "0.299"
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
            to: "0.349"
          }, {
            selected: false,
            from: "0.350",
            to: "0.379"
          }, {
            selected: false,
            from: "0.380",
            to: "0.399"
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
            to: "0.459"
          }, {
            selected: false,
            from: "0.460",
            to: "0.499"
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
            to: "0.589"
          }, {
            selected: false,
            from: "0.590",
            to: "0.649"
          }, {
            selected: false,
            from: "0.650",
            to: "0.699"
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
            to: "0.719"
          }, {
            selected: false,
            from: "0.720",
            to: "0.749"
          }, {
            selected: false,
            from: "0.750",
            to: "0.799"
          }, {
            selected: false,
            from: "0.800",
            to: "0.899"
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
            to: "0.959"
          }, {
            selected: false,
            from: "0.960",
            to: "0.999"
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
            to: "1.199"
          }, {
            selected: false,
            from: "1.200",
            to: "1.499"
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
            to: "1.699"
          }, {
            selected: false,
            from: "1.700",
            to: "1.999"
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
            to: "2.499"
          }, {
            selected: false,
            from: "2.500",
            to: "2.999"
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
            to: "3.499"
          }, {
            selected: false,
            from: "3.500",
            to: "3.999"
          }
          , {
            selected: false,
            from: "4.000",
            to: "4.499"
          }, {
            selected: false,
            from: "4.500",
            to: "4.999"
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
            to: "5.499"
          }, {
            selected: false,
            from: "5.500",
            to: "5.999"
          }
          , {
            selected: false,
            from: "6.000",
            to: "6.999"
          }, {
            selected: false,
            from: "7.000",
            to: "7.999"
          }
          , {
            selected: false,
            from: "8.000",
            to: "9.999"
          }
          , {
            selected: false,
            from: "10.000",
            to: "99.999"
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
  }
  showFancy(flag:boolean){
    this.fancyColor=flag;
  }
  SelectCriteria(list: any, item: any) {
    if (item != null) {
      item.selected = item.selected != true;
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
    this.selectedPointer=[];
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
  removeCaratRange(item){
    var indx=this.selectedPointer.indexOf(item);
    for (let j = 0; j < this.defaultCaratRange.length; j++) {
      var subElement = this.defaultCaratRange[j];
      for (let k = 0; k < subElement.list.length; k++) {
        var subsubelement = subElement.list[k];
        if (subsubelement.selected) {
            if (subsubelement.from == item.from && subsubelement.to == item.to) {
              subsubelement.selected=false;
            }
        }
      }
      subElement.selected = subElement.list.filter(x => x.selected == true).length == subElement.list.length;
    } 
    this.selectedPointer.splice(indx,1);
  }
  resetPointer() {
    this.selectedPointer = [];
  }
  addPointer() {
    if (this.fromCarat != 0 && this.toCarat != 0) {
      var newPointerList = [];
      var flag = true;
      for (let index = 0; index < this.selectedPointer.length; index++) {
        const element = this.selectedPointer[index];
        if (this.fromCarat >= element.from && this.fromCarat <= element.to ) {
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
}
