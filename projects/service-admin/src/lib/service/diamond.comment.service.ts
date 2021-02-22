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
import { DiamondCommentModel } from '../models/diamondComment.model';

@Injectable({
    providedIn: 'root'
})
export class DiamondCommentService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }

    public Load(PacketNo:string): Observable<DiamondCommentModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/DiamondComment/LoadComment?PacketNo="+PacketNo;
        return super.Get(url);
    }
    public Save(model:DiamondCommentModel): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/DiamondComment/Insert";
        return super.post(url,model);
    }
}
