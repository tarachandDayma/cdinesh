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
import { UserModuleAccessModel } from '../models/user.module.access.model';
import { UserModel } from '../models/user/user.model';
import { UserSearchCriteriaModel } from '../models/user.searchCriteria.model';

@Injectable({
    providedIn: 'root'
})
export class UserModuleAccessService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    // public AddUpdate(role:RoleModuleAccessModel[]): Observable<any> {
    //     var url = "";
    //     url = this.env.ApiGateway + "/admin/RoleModuleAccess/Add";
    //     return super.post(url,role);
    // }
    
    public LoadAll(roleId:string): Observable<UserModuleAccessModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserRoleAccess/LoadRoleAccess?RoleId="+roleId;
        return super.Get(url);
    }
    public LoadbyModule(ModuleName:string): Observable<UserModuleAccessModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserRoleAccess/LoadbyModule?ModuleName="+ModuleName;
        return super.Get(url);
    }
    public LoadUsers(searchText:string,RoleId:string ): Observable<UserModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserRoleAccess/GetUsers?SearchText="+searchText+"&RoleId="+RoleId;
        return super.Get(url);
    }
    public GetAccess(UserId:string): Observable<UserModuleAccessModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserRoleAccess/GetAccess?UserId="+UserId;
        return super.Get(url);
    }
    public GetAccessUser(UserId:string): Observable<UserModuleAccessModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserRoleAccess/GetAccessUser?UserId="+UserId;
        return super.Get(url);
    }
    public Update(model:UserModuleAccessModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserRoleAccess/Add?UserId=";
        return super.post(url,model);
    }
    public LoadSearchCriteria(UserId:string): Observable<UserSearchCriteriaModel> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSearchCriteria/Load?UserId="+UserId;
        return super.Get(url);
    }
    public AddUpdateSearchCriteria(model:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/UserSearchCriteria/AddUpdate";
        return super.post(url,model);
    }
}
