import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService, RestService } from 'service-common';
import { GuestModel } from '../model/guest.model';
import { GuestRegisterModel } from '../model/guest.register.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService extends RestService {

  constructor(public http: HttpClient, public env: EnvironmentService) {
    super(http);
  }
  public login(data: GuestModel): Observable<any> {
    var url = this.env.ApiGateway + "/Guest/login"
    var header = new HttpHeaders({
      'Content-Type': "application/x-www-form-urlencoded"
    });
    return this.http.post(url, data);
  }
  public register(data: GuestRegisterModel): Observable<any> {
    var url = this.env.ApiGateway + "/Guest/Register"
    return super.post(url, data);
  }
  public verified(userid:string): Observable<any> {
    var url = this.env.ApiGateway + "/Guest/Verified?UserId="+userid;
    return super.Get(url);
  }
  public getCaptch(): Observable<any> {
    var url = this.env.ApiGateway + "/guest/Getcaptcha";
    return super.Get(url);
  }
}
