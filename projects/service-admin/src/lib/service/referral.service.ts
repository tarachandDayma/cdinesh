import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable, Subject } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
import { CartModel } from '../models/cart.model';
import { CartBroadcaster } from './cartbroadcaster';
import { ReferralModel } from '../models/referral.model';
@Injectable({
    providedIn: "root"
  })
export class ReferralService extends RestService {
    private _eventBus: Subject<number>;
    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
        this._eventBus= new Subject<number>();
    }

    public GetAll(UserId:string): Observable<ReferralModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Referral/LoadAll?UserId="+UserId
        return super.Get(url);
    }
}
