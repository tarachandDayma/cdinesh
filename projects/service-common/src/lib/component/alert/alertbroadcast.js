"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
var alertBroadcastEventCls = /** @class */ (function () {
    function alertBroadcastEventCls(key, title, msg, data) {
        this.key = key;
        this.title = title;
        this.msg = msg;
        this.data = data;
    }
    return alertBroadcastEventCls;
}());
exports.alertBroadcastEventCls = alertBroadcastEventCls;
var AltBroadcaster = /** @class */ (function () {
    function AltBroadcaster() {
        this._eventBus = new Subject_1.Subject();
    }
    AltBroadcaster.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    AltBroadcaster.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    return AltBroadcaster;
}());
exports.AltBroadcaster = AltBroadcaster;
//# sourceMappingURL=alertbroadcast.js.map