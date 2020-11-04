import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CdineshStaticPagesService {

  constructor() { }
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
}
