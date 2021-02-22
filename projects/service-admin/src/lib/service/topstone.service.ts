import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { UserModel } from '../models/user/user.model';
import { ResetPasswordModel } from '../models/resetpassword.model';
import { diamondsearchResult } from '../models/diamond.result.model';


@Injectable({
    providedIn: 'root'
})
export class TopStoneService extends RestService {
    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public GetAll(): Observable<diamondsearchResult[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Topstone/GetAll";
        return super.Get(url);
    }
}
