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

@Injectable({
    providedIn: 'root'
})
export class OfferService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    public SaveOffer(offers:OfferModel[],diamonds:diamondsearchResult[]): Observable<any> {
        var url = "";
        var obj={
            Offers:offers,
            Diamonds:diamonds
        }
        url = this.env.ApiGateway + "/Offer/Insert";
        return super.post(url,obj);
    }
}
