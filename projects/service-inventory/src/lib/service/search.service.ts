import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
import { diamondsearchResult } from '../models/diamond.result.model';
import { UserSearchModel } from '../models/user.search.model';
@Injectable({
    providedIn: 'root'
})
export class SearchService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public Search(filter:any): Observable<diamondsearchResult[]> {
        var url = "";
        url = this.env.ApiGateway + "/SearchDiamond";
        return super.post(url,filter);
    }
    public AddSearch(filter:any): Observable<diamondsearchResult[]> {
        var url = "";
        url = this.env.ApiGateway + "/RecentSearch/AddSearch";
        return super.post(url,filter);
    }
    public GetSearch(filter:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/RecentSearch/GetFilters";
        return super.post(url,filter);
    }
    public LoadRecentSearch(): Observable<UserSearchModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/RecentSearch/LoadRecentSearch";
        return super.Get(url);
    }
    public GetNewGoodsCount(): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/NewGoodsCount";
        return super.Get(url);
    }
}
