import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderserice } from 'service-common';
import { UserPairModel } from '../../models/userPair.model';
import { PairService } from '../../service/pair.service';

@Component({
  selector: 'lib-pair-setup',
  templateUrl: './pair-setup.component.html',
  styleUrls: ['./pair-setup.component.css']
})
export class PairSetupComponent implements OnInit {

  Fields: UserPairModel[] = [];
  constructor(private pairService: PairService, private loader: loaderserice, private alertService: alertserice, public translate: TranslateService) { }

  ngOnInit(): void {
    this.LoadFields();
  }
  LoadFields() {
    this.Fields = [];
    this.loader.show(true);
    this.pairService.LoadFields().subscribe(result => {
      this.loader.show(false);
      this.Fields = result;
    }, error => {
      this.loader.show(false);
    })
  }
  dragIndex: number;
  dragStar: boolean = false;
  mouseDown(indx) {
    this.dragIndex = indx;
    this.dragStar = true;
  }
  mouseMove(indx) {
    if (this.dragStar) {
      var _oldFields = JSON.parse(JSON.stringify(this.Fields));
      this.Fields.splice(this.dragIndex, 1);
      this.Fields.splice(indx, 0, _oldFields[this.dragIndex]);
      this.dragIndex = indx;
    }
  }
  mouseUp(indx) {
    if (this.dragStar) {
      var _oldFields = JSON.parse(JSON.stringify(this.Fields));
      this.Fields.splice(this.dragIndex, 1);
      this.Fields.splice(indx, 0, _oldFields[this.dragIndex]);
      this.dragIndex = indx;
      this.dragStar = false;
      this.dragIndex=null;
    }
  }
  saveFields(){
    for (let index = 0; index < this.Fields.length; index++) {
       this.Fields[index].priority=index+1;
    }
    this.loader.show(true);
    this.pairService.SaveFields(this.Fields).subscribe(result=>{
      this.loader.show(false);
      if(result.status){
        this.LoadFields();
        this.alertService.success(this.translate.instant(result.message), "");
      }else{
        this.alertService.Error(this.translate.instant(result.message), "");
      }
    },error=>{
      this.loader.show(false);
    })
  } 
}
