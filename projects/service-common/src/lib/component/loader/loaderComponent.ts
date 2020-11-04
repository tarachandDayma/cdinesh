import { Component, OnInit } from "@angular/core";
import { loaderBroadcaster, loaderBroadcastEventCls } from "./loaderbroadcast";
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: "app-loader",
  templateUrl: "../loader/loader.html",
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({  opacity: 0 }),
            animate('1s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({  opacity: 1 }),
            animate('1s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class loader implements OnInit {
  public _hidden: boolean;
  constructor(private broadcat: loaderBroadcaster) {
    this._hidden = false;
  }
  ngOnInit() {
    this.broadcat.on().subscribe(data => this.setDataSuccess(<boolean>data));

  }
  setDataSuccess(data: boolean): void {
    this._hidden = data;
  }
}
