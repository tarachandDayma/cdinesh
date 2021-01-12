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

    public AddSearch(filter:any): Observable<any[]> {
        var url = "";
        url = this.env.ApiGateway + "/UserSaveSearch/AddSearch";
        return super.post(url,filter);
    }
    public GetSearch(filter:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/UserSaveSearch/GetFilters";
        return super.post(url,filter);
    }
    public LoadRecentSearch(): Observable<UserSearchModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/UserSaveSearch/LoadSearch";
        return super.Get(url);
    }
    public Syncy(): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/UserSaveSearch/SyncSearch";
        return super.Get(url);
    }
}
