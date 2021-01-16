import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderserice } from 'service-common';
import { UserSearchModel } from '../../models/user.search.model';
import { UserSaveSearchService } from '../../service/userSaveSearch.service';

@Component({
  selector: 'lib-save-search',
  templateUrl: './save-search.component.html',
  styleUrls: ['./save-search.component.css']
})
export class SaveSearchComponent implements OnInit {

  searches: UserSearchModel[] = [];
  constructor(private userSaveSearchService: UserSaveSearchService, private loader: loaderserice, private alertService: alertserice, public translate: TranslateService,private router:Router) { }

  ngOnInit(): void {
    this.LoadSearches();
  }
  LoadSearches() {
    this.searches = [];
    this.loader.show(true);
    this.userSaveSearchService.LoadSearch().subscribe(result => {
      this.loader.show(false);
      this.searches = result;
    }, error => {
      this.loader.show(false);
    })
  }
  RemoveSearch(item:UserSearchModel):void{
    this.loader.show(true);
    this.userSaveSearchService.RemoveSearch(item).subscribe(result => {
      this.loader.show(false);
      this.LoadSearches();
    }, error => {
      this.loader.show(false);
    })
  }
  Load(item:UserSearchModel):void{
    localStorage.setItem("saveSearch",JSON.stringify(item));
    this.router.navigate(["/inventory/search"]);
  }
  Modify(item:UserSearchModel):void{
    localStorage.setItem("modifySearch",JSON.stringify(item));
    this.router.navigate(["/inventory/search"]);
  }
  SyncSearches(){
    this.loader.show(true);
    this.userSaveSearchService.Syncy().subscribe(result=>{
      this.loader.show(false);
      this.LoadSearches();
    },error=>{
      this.loader.show(false);
    });
  }
}
