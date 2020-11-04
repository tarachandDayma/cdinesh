import { Observable, Subject } from 'rxjs/';
import { filter, map } from 'rxjs/operators';

export interface alertBroadcastEvent {
    key?: string;
    data?: any
    title?: string;
    msg?: string;
}
export class alertBroadcastEventCls implements alertBroadcastEvent {

    constructor(public key: string, public title?: string, public msg?: string, public data?: any) {

    }
}

export class AltBroadcaster {
    private _eventBus: Subject<string>;
    constructor() {
        this._eventBus = new Subject<string>();
    }
    broadcast(data: string) {
        this._eventBus.next(data);
    }
    on(): Observable<string> {
        return this._eventBus.asObservable();
    }
}
