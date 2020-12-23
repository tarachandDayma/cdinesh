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

@Injectable({
    providedIn: 'root'
})
export class DownloadService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public LoadFields(): Observable<UserDownloadFieldsModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/Download/LoadFields";
        return super.Get(url);
    }
    public SaveFields(Fields:UserDownloadFieldsModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/Download/Insert";
        return super.post(url,Fields);
    }
    public Download(Filter:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/Download";
        return super.post(url,Filter);
    }
    public SendEmail(model:ExportToEmailModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/Download/SendEmail";
        return super.post(url,model);
    }
}
