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
import { PartialClientMappingModel } from '../models/partial.client.mapping.model';
import { UserModel } from '../models/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class PartialClientMappingService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    public Add(client: PartialClientMappingModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/PartialClientMapping/Add";
        return super.post(url, client);
    }
    public Remove(clientId: string): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/PartialClientMapping/Remove?ClientId=" + clientId;
        return super.Get(url);
    }
    public Load(searchText: string): Observable<PartialClientMappingModel> {
        var url = "";
        url = this.env.ApiGateway + "/admin/PartialClientMapping/Load?SearchText=" + searchText;
        return super.Get(url);
    }
    public LoadUsersAll(searchText: string): Observable<UserModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/PartialClientMapping/LoadUserBySearch?SearchText=" + searchText;
        return super.Get(url);
    }
    public AddNewUser(client: UserModel): Observable<any> {
        var url = "";
        client.isPartial=true;
        url = this.env.authServerUrl + "/api/auth/register_Partial";
        return super.post(url, client);
    }
    public addCompany(data: any): Observable<any> {
        var url = this.env.ApiGateway + "/AddCompany"
        return super.post(url, data);
    }
}
