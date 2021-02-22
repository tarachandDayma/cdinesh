import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { UserModel } from '../models/user/user.model';
import { ResetPasswordModel } from '../models/resetpassword.model';
import { UserSearchModel } from '../models/user.search.model';

@Injectable({
    providedIn: 'root'
})
export class UserSaveSearchService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public AddSearch(item:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSaveSearch/AddSearch";
        return super.post(url,item);
    }
    public RemoveSearch(item:UserSearchModel): Observable<any[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSaveSearch/RemoveSearch";
        return super.post(url,item);
    }
    public GetSearch(filter:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSaveSearch/GetFilters";
        return super.post(url,filter);
    }
    public LoadSearch(): Observable<UserSearchModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSaveSearch/LoadSearch";
        return super.Get(url);
    }
    public Syncy(): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSaveSearch/SyncSearch";
        return super.Get(url);
    }
}
