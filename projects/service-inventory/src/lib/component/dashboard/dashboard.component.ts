import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSearchModel } from '../../models/user.search.model';
import { CartService } from '../../service/cart.service';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cartCount:number;
  recnetSearches:UserSearchModel[];
  constructor(private router:Router,private cartService: CartService,private searchService: SearchService) { }

  ngOnInit(): void {
    this.LoadCart();
    this.LoadRecentSearch();
  }
  LoadCart() {
    this.cartService.GetAll().subscribe(result => {
      this.cartCount = result.length;
    });
  }
  LoadRecentSearch(){
      this.searchService.LoadRecentSearch().subscribe(result=> {
        this.recnetSearches=result;
      })
  }
  search(item){
    localStorage.setItem("recentSearch",JSON.stringify(item));
    this.router.navigate(["/inventory/search"]);
  }
}
