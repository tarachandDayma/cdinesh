import { Component,  OnInit} from "@angular/core";
import { AltBroadcaster } from "./alertbroadcast";

@Component({
    selector: "alert",
    templateUrl: "../alert/Alert.html"
})
export class alert implements OnInit {
    public _hidden: boolean;
    public title: string;
    public privatemessage: string;
    public MegBoxType: string;
    constructor(  private broadcat: AltBroadcaster) {
        this._hidden = true;
        this.MegBoxType = "";
    }
    ngOnInit() {
        this.broadcat.on().subscribe(data => this.setDataSuccess(data));
    }
    setDataSuccess(values: string): void {
        var data=JSON.parse(values);
        this.title = data.title;
        this.privatemessage = data.msg;
        this.MegBoxType = data.key;
        this._hidden = false;
    }
    close(): void {
        this.MegBoxType = "";
    }


}
