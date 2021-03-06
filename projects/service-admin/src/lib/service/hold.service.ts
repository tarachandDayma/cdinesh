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
import { UserPairModel } from '../models/userPair.model';
import { OfferModel } from '../models/offer.model';
import { InquiryModel } from '../models/inquiry.model';
import { HoldModel } from '../models/hold.model';
import { AnyARecord } from 'dns';

@Injectable({
    providedIn: 'root'
})
export class HoldService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    public SaveHold(obj:any): Observable<any> {
        var url = "";
        
        url = this.env.ApiGateway + "/admin/Hold/Insert";
        return super.post(url,obj);
    }
    public PriceChange(obj:any): Observable<diamondsearchResult[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Hold/ReloadHoldData";
        return super.post(url,obj);
    }
    public LoadMessage(Inquireis:HoldModel[],diamonds:diamondsearchResult[]): Observable<any> {
        var url = "";
        var obj={
            holds:Inquireis,
            Diamonds:diamonds
        }
        url = this.env.ApiGateway + "/admin/Hold/GetStatusMessage";
        return super.post(url,obj);
    }
}
