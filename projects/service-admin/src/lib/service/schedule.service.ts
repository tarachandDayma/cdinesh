import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { UserModel } from '../models/user/user.model';
import { ResetPasswordModel } from '../models/resetpassword.model';
import { UserSearchModel } from '../models/user.search.model';
import { UserWishModel } from '../models/userWish.model';
import { ScheduleModel } from '../models/schedule.model';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public AddSearch(item:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Schedule/AddSearch";
        return super.post(url,item);
    }
    public RemoveSearch(item:ScheduleModel): Observable<any[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Schedule/RemoveSearch";
        return super.post(url,item);
    }
    public GetSearch(filter:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Schedule/GetFilters";
        return super.post(url,filter);
    }
    public LoadSearch(): Observable<ScheduleModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Schedule/LoadSearch";
        return super.Get(url);
    }
    public Syncy(): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Schedule/SyncSearch";
        return super.Get(url);
    }
    public GetCountry(): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/GetCountry";
        return super.Get(url);
    }

}
