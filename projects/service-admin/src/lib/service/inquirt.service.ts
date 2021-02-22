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

@Injectable({
    providedIn: 'root'
})
export class InquiryService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    public SaveInquiry(Inquireis:InquiryModel[],diamonds:diamondsearchResult[]): Observable<any> {
        var url = "";
        var obj={
            Inquireis:Inquireis,
            Diamonds:diamonds
        }
        url = this.env.ApiGateway + "/admin/Inquiry/Insert";
        return super.post(url,obj);
    }
    public GetInquiries(): Observable<InquiryModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/Inquiry/LoadInquiries";
        return super.Get(url);
    }
}
