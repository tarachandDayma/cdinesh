import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { loginModel } from '../models/login.model';
import { RestService, EnvironmentService } from 'service-common';
import { UserModel } from '../models/user.model';
import { ResetPasswordModel } from '../models/resetpassword.model';
@Injectable({
  providedIn: 'root'
})
export class loginService extends RestService  {

  constructor(public http: HttpClient,public env:EnvironmentService) { 
      super(http);
  }
  public login(data:FormData):Observable<any>{
    var url = this.env.authServerUrl+"/api/Auth/login"
    var header= new HttpHeaders({
      'Content-Type': "application/x-www-form-urlencoded"
    });
    return this.http.post(url,data);
  }
  public addCompany(data:any):Observable<any>{
    var url = this.env.ApiGateway+"/AddCompany"
    return super.post(url,data);
  }
  public register(data:UserModel):Observable<any>{
    var url = this.env.authServerUrl+"/api/Auth/register"
    return super.post(url,data);
  }
  public ResetPassword(data:ResetPasswordModel):Observable<any>{
    var url = this.env.authServerUrl+"/api/Auth/ResetPassword"
    return super.post(url,data);
  }
  public loadSellers():Observable<any>{
    var url = this.env.authServerUrl+"/api/Auth/GetSalesExecutive"
    return super.Get(url,);
  }
  public getCaptch(): Observable<any> {
    var url = this.env.authServerUrl+"/api/Captch/Getcaptcha";
    return super.Get(url);
  }
  public forgotPassword(UserName:string):Observable<any>{
    var url = this.env.authServerUrl+"/api/Auth/Forgotpassword?UserName="+UserName
    return super.Get(url);
  }
  
}
