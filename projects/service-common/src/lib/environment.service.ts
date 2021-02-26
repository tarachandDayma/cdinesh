import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from "@angular/core";
import { Router } from '@angular/router';
import { RoleModuleAccessModel } from './model/role.module.access.model';
import { UserModuleAccessModel } from './model/user.module.access.model';
declare var jQuery;
@Injectable({
  providedIn: "root"
})
export class EnvironmentService {
  constructor(public http?: HttpClient, @Inject("Window") private window?: any, private router?: Router) {

  }

  // get data object from script in Index.cshtml
  private get environmentData(): any {

    return (this.window as any);
  }

  public getValue(key: string): string {
    if (!this.environmentData) {
      console.error("please set environment-variables");
      return null;
    }
    if (!this.environmentData[key]) {
      console.error(`please set environment-variable ${key}`);
      return null;
    }
    return this.environmentData[key];
  }

  public get authServerUrl(): string {
    return this.getValue("authServe");
  }

  public get appTitle(): string {
    return this.getValue("AppTitle");
  }
  public get clientId(): string {
    return this.getValue("Clientid");
  }
  public get logoUrl(): string {
    return this.getValue("AppLogo");
  }
  public get AppUrl(): string {
    return this.getValue("AppUrl");
  }
  public get GrantType(): string {
    return this.getValue("GrantType");
  }
  public get ClientSecret(): string {
    return this.getValue("ClientSecret");
  }
  public get Scope(): string {
    return this.getValue("Scope");
  }
  public get ApiGateway(): string {
    return this.getValue("ApiGateway");
  }
  public get AppName(): string {
    return this.getValue("AppName");
  }
  public get DomainId(): string {
    return this.getValue("domainid");
  }
  private _returnUrl: string;
  public get returnUrl(): string {
    return this._returnUrl;
  }
  public set returnUrl(v: string) {
    this._returnUrl = v;
  }
  public get Authtoken(): string {
    return localStorage.getItem("authenticationtoken");
  }
  public set Authtoken(v: string) {
    localStorage.setItem("authenticationtoken", v);
  }
  CheckLogin(): boolean {
    var returnflag = undefined;
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.Authtoken
    });
    this.http.get<any>(this.ApiGateway + "/IsLoggedIn", { headers: header }).toPromise().then(result => returnflag = true, error => {
      this.CheckGuestLogin();
    });
    return returnflag;
  }
  CheckGuestLogin(): boolean {
    var returnflag = undefined;
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.Authtoken
    });
    this.http.get<any>(this.ApiGateway + "/IsGuestLoggedIn", { headers: header }).toPromise().then(result => returnflag = true, error => {
      location.reload();
    });
    return returnflag;
  }

  public get IsLogin(): boolean {
    // return this.CheckLogin();
    var flag = false;
    var _thiscomp = this;
    try {
      var request = new XMLHttpRequest();
      request.open('GET', this.ApiGateway + "/IsLoggedIn", false);  // `false` makes the request synchronous
      request.setRequestHeader("Authorization", "Bearer " + _thiscomp.Authtoken)
      request.send(null);
      if (request.status === 200) {
        flag = true;
      }
    } catch (error) {

    }

    return flag;
  }
  public get IsGuestLogin(): boolean {
    // return this.CheckGuestLogin();
    var flag = false;
    var _thiscomp = this;
    try {
      var request = new XMLHttpRequest();
      request.open('GET', this.ApiGateway + "/IsGuestLoggedIn", false);  // `false` makes the request synchronous
      request.setRequestHeader("Authorization", "Bearer " + _thiscomp.Authtoken)
      request.send(null);
      if (request.status === 200) {
        flag = true;
      }
    } catch (error) {

    }

    return flag;
  }
  public get IsAdminLogin(): boolean {
    // return this.CheckGuestLogin();
    var flag = false;
    var _thiscomp = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.ApiGateway + "/Admin/IsLoggedIn", false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", "Bearer " + _thiscomp.Authtoken)
    request.send(null);
    if (request.status === 200) {
      flag = true;
    }
    return flag;
  }
  public RoleModuleAccessList: RoleModuleAccessModel[] = [];
  public GetModuleAcccess():boolean {
    // return this.CheckGuestLogin();
    var flag = false;
    var _thiscomp = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.ApiGateway + "/admin/RoleModuleAccess/LoadbyModule", false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", "Bearer " + _thiscomp.Authtoken)
    request.send(null);
    if (request.status === 200) {
      flag = true;
      _thiscomp.RoleModuleAccessList = JSON.parse(request.responseText);
    }
    this.GetUserModuleAcccess();
    return flag;
  }
  public UserModuleAccessList: UserModuleAccessModel[] = [];
  public GetUserModuleAcccess():boolean {
    // return this.CheckGuestLogin();
    var flag = false;
    var _thiscomp = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.ApiGateway + "/admin/UserRoleAccess/GetAccess", false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", "Bearer " + _thiscomp.Authtoken)
    request.send(null);
    if (request.status === 200) {
      flag = true;
      _thiscomp.UserModuleAccessList = JSON.parse(request.responseText);
    }
    return flag;
  }
  public CheckModuleAccess(ModuleName: string, Action: string): boolean {
    // return this.CheckGuestLogin();
    var flag = false;
    var _thiscomp = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.ApiGateway + "/Admin/CheckModuleActionAccess?ModuleName=" + ModuleName + "&Action=" + Action, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", "Bearer " + _thiscomp.Authtoken)
    request.send(null);
    if (request.status === 200) {
      flag = true;
    }
    return flag;
  }



  public logout() {
    this.Authtoken = null;
    this.router.navigateByUrl("/auth/login");
  }
}
