import { Injectable } from "@angular/core";
import { loaderBroadcaster, loaderBroadcastEventCls } from "./loaderbroadcast";

@Injectable()
export class loaderserice {
  
  constructor(private _Broadcaster: loaderBroadcaster) {
    
  }
  public show(hidden:boolean) {
    try {
      
      this._Broadcaster.broadcast(hidden)
    } catch (e) {

    }
    
  }
}
