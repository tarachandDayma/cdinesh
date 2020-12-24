import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
import { diamondsearchResult } from '../models/diamond.result.model';
import { UserSearchModel } from '../models/user.search.model';
import { UserDownloadFieldsModel } from '../models/user.download.fields.model';
import { ExportToEmailModel } from '../models/exportToEmail.model';
import { UserPairModel } from '../models/userPair.model';

@Injectable({
    providedIn: 'root'
})
export class PairService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public LoadFields(): Observable<UserPairModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/Pair/LoadFields";
        return super.Get(url);
    }
    public SaveFields(Fields:UserPairModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/Pair/Insert";
        return super.post(url,Fields);
    }
}
