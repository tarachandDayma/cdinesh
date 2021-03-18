import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { UserModel } from '../models/user/user.model';
import { ResetPasswordModel } from '../models/resetpassword.model';

@Injectable({
    providedIn: 'root'
})
export class UserService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public GetUser(): Observable<any> {
        var url = "";
        if (this.env.IsGuestLogin)
            url = this.env.ApiGateway + "/admin/guest/GetUser";
        else
            url = this.env.ApiGateway + "/admin/GetUser";
        return super.Get(url);
    }
    public LoadUserinfor(): Observable<UserModel> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSetup/Load";
        return super.Get(url);
    }
    public Update(userModel: any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSetup/Update";
        return super.post(url, userModel);
    }
    public UpdateNew(userModel: any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSetup/UpdateUserNew";
        return super.post(url, userModel);
    }
    public ResetPassword(data: ResetPasswordModel): Observable<any> {
        var url = this.env.authServerUrl + "/api/Auth/ResetPassword"
        return super.post(url, data);
    }
    public getCaptch(): Observable<any> {
        var url = this.env.authServerUrl + "/api/Captch/Getcaptcha";
        return super.Get(url);
    }
    public GetSeller(): Observable<UserModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/GetSalesExecutive";
        return super.Get(url);
    }
    public GetClientList(SearchText:string): Observable<UserModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/User/GetClientList?SearchText="+SearchText;
        return super.Get(url);
    }
    public addCompany(data:any):Observable<any>{
        var url = this.env.ApiGateway+"/AddCompany"
        return super.post(url,data);
      }
      public register(data:UserModel):Observable<any>{
        var url = this.env.authServerUrl+"/api/Auth/register"
        return super.post(url,data);
      }
      public loadSellers():Observable<any>{
        var url = this.env.authServerUrl+"/api/Auth/GetSalesExecutive"
        return super.Get(url,);
      }
     
      public forgotPassword(UserName:string):Observable<any>{
        var url = this.env.authServerUrl+"/api/Auth/Forgotpassword?UserName="+UserName
        return super.Get(url);
      }
}
