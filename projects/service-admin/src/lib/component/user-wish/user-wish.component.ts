import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderserice } from 'service-common';
import { UserWishModel } from '../../models/userWish.model';
import { UserWishService } from '../../service/user.wish.service';

@Component({
  selector: 'lib-user-wish',
  templateUrl: './user-wish.component.html',
  styleUrls: ['./user-wish.component.css']
})
export class UserWishComponent implements OnInit {

  searches: UserWishModel[] = [];
  constructor(private userWishService: UserWishService, private loader: loaderserice, private alertService: alertserice, public translate: TranslateService,private router:Router) { }

  ngOnInit(): void {
    this.LoadSearches();
  }
  LoadSearches() {
    this.searches = [];
    this.loader.show(true);
    this.userWishService.LoadSearch().subscribe(result => {
      this.loader.show(false);
      this.searches = result;
    }, error => {
      this.loader.show(false);
    })
  }
  RemoveSearch(item:UserWishModel):void{
    this.loader.show(true);
    this.userWishService.RemoveSearch(item).subscribe(result => {
      this.loader.show(false);
      this.LoadSearches();
    }, error => {
      this.loader.show(false);
    })
  }
  Load(item:UserWishModel):void{
    localStorage.setItem("saveUserWish",JSON.stringify(item));
    this.router.navigate(["/admin/search"]);
  }
  Modify(item:UserWishModel):void{
    localStorage.setItem("modifyUserWish",JSON.stringify(item));
    this.router.navigate(["/admin/search"]);
  }
  SyncSearches(){
    this.loader.show(true);
    this.userWishService.Syncy().subscribe(result=>{
      this.loader.show(false);
      this.LoadSearches();
    },error=>{
      this.loader.show(false);
    });
  }
  toggleDetail(item:UserWishModel){
    item.showDetail=!item.showDetail;
  }
}
