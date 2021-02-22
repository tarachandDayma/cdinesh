import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderserice } from 'service-common';
import { ScheduleModel } from '../../models/schedule.model';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'lib-diamond-schedule',
  templateUrl: './diamond-schedule.component.html',
  styleUrls: ['./diamond-schedule.component.css']
})
export class DiamondScheduleComponent implements OnInit {

  searches: ScheduleModel[] = [];
  constructor(private scheduleService: ScheduleService, private loader: loaderserice, private alertService: alertserice, public translate: TranslateService,private router:Router) { }

  ngOnInit(): void {
    this.LoadSearches();
  }
  LoadSearches() {
    this.searches = [];
    this.loader.show(true);
    this.scheduleService.LoadSearch().subscribe(result => {
      this.loader.show(false);
      this.searches = result;
    }, error => {
      this.loader.show(false);
    })
  }
  RemoveSearch(item:ScheduleModel):void{
    this.loader.show(true);
    this.scheduleService.RemoveSearch(item).subscribe(result => {
      this.loader.show(false);
      this.LoadSearches();
    }, error => {
      this.loader.show(false);
    })
  }
  Load(item:ScheduleModel):void{
    localStorage.setItem("saveUserSchedule",JSON.stringify(item));
    this.router.navigate(["/inventory/search"]);
  }
  Modify(item:ScheduleModel):void{
    localStorage.setItem("modifyUserSchedule",JSON.stringify(item));
    this.router.navigate(["/inventory/search"]);
  }
  SyncSearches(){
    this.loader.show(true);
    this.scheduleService.Syncy().subscribe(result=>{
      this.loader.show(false);
      this.LoadSearches();
    },error=>{
      this.loader.show(false);
    });
  }

}
