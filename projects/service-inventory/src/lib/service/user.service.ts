import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { UserModel } from '../models/user/user.model';

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
            url = this.env.ApiGateway + "/guest/GetUser";
        else
            url = this.env.ApiGateway + "/GetUser";
        return super.Get(url);
    }
    public LoadUserinfor():Observable<UserModel>{
        var url = "";
        url = this.env.ApiGateway + "/UserSetup/Load";
        return super.Get(url);
    }
    public Update(userModel:any):Observable<any>{
        var url = "";
        url = this.env.ApiGateway + "/UserSetup/Update";
        return super.post(url,userModel);
    }
}
