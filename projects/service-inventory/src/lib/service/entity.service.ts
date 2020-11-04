import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
@Injectable({
    providedIn: 'root'
})
export class EntityService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public GetEntity(MasterName: string): Observable<EntityModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/GetEntity?MasterName=" + MasterName;
        return super.Get(url);
    }


}
