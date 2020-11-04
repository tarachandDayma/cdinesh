import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { UserModel } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class userService extends RestService {

  constructor(public http: HttpClient, public env: EnvironmentService) {
    super(http);
  }

  public GetUsers(searchText: string): Observable<any> {

    var url = this.env.ApiGateway + "/Admin/GetUsers?SearchText=" + searchText
    return super.Get(url);

  }
  public GetUser(): Observable<any> {
    var url = "";
    if (this.env.IsGuestLogin)
      url = this.env.ApiGateway + "/guest/GetUser";
    else
      url = this.env.ApiGateway + "/GetUser";
    return super.Get(url);
  }
  public addCompany(data:any):Observable<any>{
    var url = this.env.ApiGateway+"/AddCompany"
    return super.post(url,data);
  }
  public update(data:UserModel):Observable<any>{
    var url = this.env.ApiGateway+"/Admin/UpdateUser"
    return super.post(url,data);
  }
  public loadSellers():Observable<any>{
    var url = this.env.authServerUrl+"/api/Auth/GetSalesExecutive"
    return super.Get(url,);
  }
  public GetBroker():Observable<any>{
    var url = this.env.ApiGateway+"/Admin/GetBrokerList"
    return super.Get(url,);
  }
}
