import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobleService {

  constructor() {
    this.Applogo=environment.AppLogo;
    this.AppTitle=environment.AppTitle;
   }
  /// get set globle application logos
  private _Applogo : string;
  public get Applogo() : string {
    return this._Applogo;
  }
  public set Applogo(v : string) {
    this._Applogo = v;
  }
  /// get set globle application title
  private _AppTitle : string;
  public get AppTitle() : string {
    return this._AppTitle;
  }
  public set AppTitle(v : string) {
    this._AppTitle = v;
  }
  
  private _value : string;
  public get value() : string {
    return this._value;
  }
  public set value(v : string) {
    this._value = v;
  }
  
}
