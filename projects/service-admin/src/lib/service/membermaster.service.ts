import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
import { diamondsearchResult } from '../models/diamond.result.model';
import { UserSearchModel } from '../models/user.search.model';
import { TermsModel } from '../models/terms.model';
import { MemberMasterModel } from '../models/memberMaster.model';
@Injectable({
    providedIn: 'root'
})
export class MemberMasterService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    public GetAll(SearchText:string): Observable<MemberMasterModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/MemberMaster/GetAll?SearchText"+SearchText;
        return super.Get(url);
    }
    public GetAddat(): Observable<any[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Common/GetAddat";
        return super.Get(url);
    }
}
