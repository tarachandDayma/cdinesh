import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { alert, alertserice, EnvironmentService, loaderserice } from 'service-common';
import { UserModel } from '../../models/user.model';
import { userService } from '../../services/user.service';

@Component({
  selector: 'lib-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userserve:userService,private alert:alertserice,private loader:loaderserice,private environment : EnvironmentService, public translate: TranslateService) { }
  Mode:string="";
  users: UserModel[] = [];
  searchText:string="";
  canEdit:boolean=false;
  item:UserModel;
  ngOnInit(): void {   
    this.searchUser()  ;
    this.canEdit=this.environment.CheckModuleAccess('User','Edit');
  } 
  searchUser(){
    this.loader.show(true);   
    this.userserve.GetUsers(this.searchText).subscribe(result=>{
      this.users=result;   
      this.loader.show(false);
    },error=>{
      this.loader.show(false);
      this.alert.Error("error","something went wrong");
    })
  }
  EditUser(_item:UserModel){
    this.item=_item;
    this.Mode="Edit";
  }
  savedata(){
    this.Mode="";
    this.searchUser();
  }
  canceldata(){
    this.Mode="";
  }
}
