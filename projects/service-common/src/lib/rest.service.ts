import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestService {
header:HttpHeaders;
  constructor(public http?:HttpClient,@Inject('domainid') public domainid?:string) {

  }
  public Get(path:string):Observable<any>{
    var token=localStorage.getItem('authenticationtoken');
    
   this.header= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    return this.http.get<any>(path,{ headers: this.header});
  }
  public post<T>(path:string,entity:T):Observable<any>{
    var token=localStorage.getItem('authenticationtoken');
    
   this.header= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    return this.http.post<any>(path,entity,{ headers: this.header});
  }
  public put<T>(path:string,entity:T):Observable<any>{
   var token=localStorage.getItem('authenticationtoken');
    
   this.header= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    return this.http.put<any>(path,entity,{ headers: this.header});
  }
  public delete(path:string):Observable<any>{
    var token=localStorage.getItem('authenticationtoken');
     
    this.header= new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': "Bearer " + token
     });
     return this.http.delete<any>(path,{ headers: this.header});
   }
}
