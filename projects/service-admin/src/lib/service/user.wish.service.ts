import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { UserModel } from '../models/user/user.model';
import { ResetPasswordModel } from '../models/resetpassword.model';
import { UserSearchModel } from '../models/user.search.model';
import { UserWishModel } from '../models/userWish.model';

@Injectable({
    providedIn: 'root'
})
export class UserWishService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public AddSearch(item:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserWish/AddSearch";
        return super.post(url,item);
    }
    public RemoveSearch(item:UserWishModel): Observable<any[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserWish/RemoveSearch";
        return super.post(url,item);
    }
    public GetSearch(filter:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserWish/GetFilters";
        return super.post(url,filter);
    }
    public LoadSearch(): Observable<UserWishModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserWish/LoadSearch";
        return super.Get(url);
    }
    public Syncy(): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserWish/SyncSearch";
        return super.Get(url);
    }
}
