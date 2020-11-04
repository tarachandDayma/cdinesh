import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../environment.service';
import { RestService } from '../rest.service';
declare var jQuery;
@Injectable({
    providedIn: "root"
})
export class DropDownService extends RestService {
    constructor(public http: HttpClient, public env: EnvironmentService) {
        super(http);
    }
    loadData(path: string): Observable<any> {
        return super.Get(this.env.ApiGateway + "/" + path);
    }
}
