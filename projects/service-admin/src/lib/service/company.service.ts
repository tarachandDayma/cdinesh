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
import { RoleModel } from '../models/role.model';
import { CompanyModel } from '../models/company.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public AddUpdate(role:CompanyModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Company/AddUpdate";
        return super.post(url,role);
    }
    public Remove(role:CompanyModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Company/Remove";
        return super.post(url,role);
    }
    public LoadAll(CompanyId:string): Observable<CompanyModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Company/LoadAll?CompanyName="+CompanyId    ;
        return super.Get(url);
    }
    public Load(roleName:string): Observable<CompanyModel> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Company/Load";
        return super.Get(url);
    }
    public GetAll(): Observable<CompanyModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Company/GetAll";
        return super.Get(url);
    }
}
