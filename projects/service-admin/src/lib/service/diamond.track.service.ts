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
import { DiamondTrackModel } from '../models/diamond.track.model';

@Injectable({
    providedIn: 'root'
})
export class DiamondTrackService extends RestService {

    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    public Add(model:DiamondTrackModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/DiamondTrack/Insert";
        return super.post(url,model);
    }
    public Remove(model:DiamondTrackModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/DiamondTrack/Remove";
        return super.post(url,model);
    }
    public Active(model:DiamondTrackModel[]): Observable<any> {
        var url = "";
        url = this.env.ApiGateway + "/admin/DiamondTrack/Active";
        return super.post(url,model);
    }
    public LoadAll(): Observable<DiamondTrackModel[]> {
        var url = "";
        url = this.env.ApiGateway + "/admin/DiamondTrack/LoadAll";
        return super.Get(url);
    }
}
