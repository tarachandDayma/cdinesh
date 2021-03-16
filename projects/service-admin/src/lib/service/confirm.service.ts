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
import { ConfirmModel } from '../models/confirm.model';

@Injectable({
    providedIn: 'root'
})
export class ConfirmService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    public SaveConfirm(obj:any): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Confirm/Insert";
        return super.post(url,obj);
    }
    public PriceChange(obj:any): Observable<diamondsearchResult[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Confirm/ReloadHoldData";
        return super.post(url,obj);
    }
    public LoadMessage(confirm:ConfirmModel[],diamonds:diamondsearchResult[]): Observable<any> {
        var url = "";
        var obj={
            Confirms:confirm,
            Diamonds:diamonds
        }
        url = this.env.ApiGateway + "/admin/Confirm/GetStatusMessage";
        return super.post(url,obj);
    }
    
}
