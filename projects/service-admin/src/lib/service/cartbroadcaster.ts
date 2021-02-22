import { Observable, Subject } from "rxjs";

export class CartBroadcaster {
    private _eventBus: Subject<string>;
    constructor() {
        this._eventBus = new Subject<string>();
    }
    broadcast(data:string) {
        this._eventBus.next(data);
    }
    on(): Observable<string> {
        return this._eventBus.asObservable();
    }
}
