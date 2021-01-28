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
import { UserDownloadMasterModel } from '../models/user.download.master.model';

@Injectable({
    providedIn: 'root'
})
export class DownloadService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public LoadFields(): Observable<UserDownloadMasterModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/Download/LoadFields";
        return super.Get(url);
    }
    public AddNew(): Observable<UserDownloadMasterModel> {
        var url = "";
        url = this.env.ApiGateway + "/Download/New";
        return super.Get(url);
    }
    public SaveFields(Fields:UserDownloadMasterModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/Download/Insert";
        return super.post(url,Fields);
    }
    public RemoveFields(Fields:UserDownloadMasterModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/Download/Remove";
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
