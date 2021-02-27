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
import { RoleModuleAccessModel } from '../models/role.module.access.model';
import { RoleSearchCriteriaModel } from '../models/role.searchcriteria.model';

@Injectable({
    providedIn: 'root'
})
export class RoleModuleAccessService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public AddUpdate(role:RoleModuleAccessModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/RoleModuleAccess/Add";
        return super.post(url,role);
    }
    
    public LoadAll(roleId:string): Observable<RoleModuleAccessModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/RoleModuleAccess/LoadRoleAccess?RoleId="+roleId;
        return super.Get(url);
    }
    public LoadbyModule(ModuleName:string): Observable<RoleModuleAccessModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/RoleModuleAccess/LoadbyModule?ModuleName="+ModuleName;
        return super.Get(url);
    }
    public LoadSearchCriteria(RoleId:string): Observable<RoleSearchCriteriaModel> {
        var url = "";
        url = this.env.ApiGateway + "/admin/RoleSearchCriteria/Load?RoleId="+RoleId;
        return super.Get(url);
    }
    public AddUpdateSearchCriteria(model:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/RoleSearchCriteria/AddUpdate";
        return super.post(url,model);
    }
}
