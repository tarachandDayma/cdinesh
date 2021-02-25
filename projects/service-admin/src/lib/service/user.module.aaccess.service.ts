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
}
