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
  shapeList:EntityModel[];
  ngOnInit(): void {
    this.loader.show(true);
    this.entityService.GetEntity("Shape").subscribe(result=>{
      this.loader.show(false);
      this.shapeList=result;
    },error=>{
      this.loader.show(false);
    })
  }

}
