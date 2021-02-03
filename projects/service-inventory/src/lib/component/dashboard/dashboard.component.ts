import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { diamondsearchResult } from '../../models/diamond.result.model';
import { UserSearchModel } from '../../models/user.search.model';
import { UserModel } from '../../models/user/user.model';
import { CartService } from '../../service/cart.service';
import { InquiryService } from '../../service/inquirt.service';
import { SearchService } from '../../service/search.service';
import { TopStoneService } from '../../service/topstone.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cartCount:number;
  recnetSearches:UserSearchModel[];
  topStones:diamondsearchResult[]=[];
  NewGoodsCount:number=0;
  InquiryCount:number=0;
  sellers:UserModel[]=[];
  constructor(private router:Router,private cartService: CartService,private searchService: SearchService,private topStoneService:TopStoneService,private inquiryservice:InquiryService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.LoadCart();
    this.LoadRecentSearch();
    this.GetAllFeaturedStones();
    this.GetNewGoodCount();
    this.GetInquiryCount();
    this.GetSeller();
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
  GetAllFeaturedStones(){
    this.topStoneService.GetAll().subscribe(result=>{
        this.topStones= result;
    },error=>{

    })
  }
  GetNewGoodCount(){
    this.searchService.GetNewGoodsCount().subscribe(result=>{
        this.NewGoodsCount= result;
    },error=>{

    })
  }
  GetInquiryCount(){
    this.inquiryservice.GetInquiries().subscribe(result=>{
        this.InquiryCount= result.length;
    },error=>{

    })
  }
  GetSeller(){
    this.userService.GetSeller().subscribe(result=>{
        this.sellers= result;
    },error=>{

    })
  }
}
