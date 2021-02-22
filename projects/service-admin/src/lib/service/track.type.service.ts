import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';

import { TrackTypeModel } from '../models/tracktype.model';

@Injectable({
    providedIn: 'root'
})
export class TrackTypeService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    
    public LoadAll(): Observable<TrackTypeModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/TrackType/GetAll";
        return super.Get(url);
    }
    public LoadAllByUser(): Observable<TrackTypeModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/TrackType/GetAllbyUser";
        return super.Get(url);
    }
}
