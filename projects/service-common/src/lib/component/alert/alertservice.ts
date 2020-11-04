import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { AltBroadcaster, alertBroadcastEventCls } from "./alertbroadcast";

@Injectable()
export class alertserice {
  private _alertBroadcastEvent: alertBroadcastEventCls;
  private _eventBus: Subject<any>;
  constructor(private _Broadcaster: AltBroadcaster) {
    this._alertBroadcastEvent = new alertBroadcastEventCls("", "");
  }
  public success(title: string, message: string) {
    try {
      this._alertBroadcastEvent.msg = message;
      this._alertBroadcastEvent.title = title;
      this._alertBroadcastEvent.key="success";
      this._Broadcaster.broadcast(JSON.stringify(this._alertBroadcastEvent));
    } catch (e) {
        console.error(e);
    }
    
  }
  
  public Error(title: string, message: string) {
    try {
      this._alertBroadcastEvent.msg = message;
      this._alertBroadcastEvent.title = title;
      this._alertBroadcastEvent.key="error";
      this._Broadcaster.broadcast(JSON.stringify(this._alertBroadcastEvent));
    } catch (e) {

    }
    
  }
}
