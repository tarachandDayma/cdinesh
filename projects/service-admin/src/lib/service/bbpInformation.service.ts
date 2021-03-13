import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable, Subject } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
import { CartModel } from '../models/cart.model';
import { CartBroadcaster } from './cartbroadcaster';
import { ReferralModel } from '../models/referral.model';
import { BBPInformationModel } from '../models/bbpInformation.model';
@Injectable({
    providedIn: "root"
  })
export class BBpInformationService extends RestService {
    private _eventBus: Subject<number>;
    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
        this._eventBus= new Subject<number>();
    }

    public GetAll(BBPID:string): Observable<BBPInformationModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/BBPInformation/LoadAll?BBPID="+BBPID
        return super.Get(url);
    }
}
