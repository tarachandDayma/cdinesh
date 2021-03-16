import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
import { ExportTermsMasterModel } from '../models/exportTermsMaster.model';
import { HkTermsMasterModel } from '../models/hkTerms.master.model';
@Injectable({
    providedIn: 'root'
})
export class HKExportTermMasterService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public LoadAll(): Observable<HkTermsMasterModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/HkTermsMaster/LoadAll";
        return super.Get(url);
    }
}
