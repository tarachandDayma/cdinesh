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

@Injectable({
    providedIn: 'root'
})
export class RolesService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public AddUpdate(role:RoleModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Role/AddUpdate";
        return super.post(url,role);
    }
    public Remove(role:RoleModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Role/Remove";
        return super.post(url,role);
    }
    public LoadAll(roleName:string): Observable<RoleModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Role/LoadAll?RoleName="+roleName    ;
        return super.Get(url);
    }
    public Load(roleName:string): Observable<RoleModel> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Role/Load";
        return super.Get(url);
    }
    public GetAll(): Observable<RoleModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Role/GetAll";
        return super.Get(url);
    }
}
