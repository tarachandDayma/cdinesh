import { Subject, Observable } from 'rxjs';

export interface loaderBroadcastEvent {
  hidden?: boolean;
}
export class loaderBroadcastEventCls implements loaderBroadcastEvent {

  constructor(public hidden?: boolean) {

  }
}

export class loaderBroadcaster {
  private _eventBus: Subject<boolean>;
  constructor() {
    this._eventBus = new Subject<boolean>();
  }
  broadcast(data?: boolean) {
    this._eventBus.next(data);
  }
  on(): Observable<boolean> {
    return this._eventBus.asObservable();
  }
}
