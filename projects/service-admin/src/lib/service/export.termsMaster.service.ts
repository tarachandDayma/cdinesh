import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
import { ExportTermsMasterModel } from '../models/exportTermsMaster.model';
@Injectable({
    providedIn: 'root'
})
export class ExportTermMasterService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public LoadAll(): Observable<ExportTermsMasterModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/ExportTermsMaster/LoadAll";
        return super.Get(url);
    }
}
