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
  clarityList: any;
  ngOnInit(): void {
    this.shapeList = {
      allSelected: false,
      selectedOther: false,
      list: []
    };
    this.colorList = {
      allSelected: false,
      selectedOther: false,
      list: []
    };
    this.clarityList = {
      allSelected: false,
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
  } 
  
  SelectCriteria(list: any, item: any) {
    if (item != null) {
      item.selected = item.selected != true;
      list.allSelected = list.list.filter(x => x.selected == true).length == list.length;
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
      list.selectedOther = list.allSelected;
      list.list.forEach(element => {
        element.selected = list.allSelected;
      });
    } 
  }

}
