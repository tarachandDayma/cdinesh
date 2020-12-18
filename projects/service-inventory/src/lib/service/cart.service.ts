import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable, Subject } from 'rxjs';
import { RestService, EnvironmentService } from 'service-common';
import { EntityModel } from '../models/entity.model';
import { CartModel } from '../models/cart.model';
import { CartBroadcaster } from './cartbroadcaster';
@Injectable({
    providedIn: "root"
  })
export class CartService extends RestService {
    private _eventBus: Subject<number>;
    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
        this._eventBus= new Subject<number>();
    }

    public GetAll(): Observable<CartModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/UserCart/GetAll"
        return super.Get(url);
    }
    public Add(item:CartModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/UserCart/Add"
        return super.post(url,item);
    }
    public Update(item:CartModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/UserCart/Update"
        return super.post(url,item);
    }
    public Delete(item:CartModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/UserCart/Delete"
        return super.post(url,item);
    }
    broadcast(data:number) {
        this._eventBus.next(data);
    }
    CartChange(): Observable<number> {
        return this._eventBus.asObservable();
    }
}
