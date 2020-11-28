import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-app-switch',
  templateUrl: './app-switch.component.html',
  styleUrls: ['./app-switch.component.css']
})
export class AppSwitchComponent implements OnInit {
  @Input("_value")
  _value: boolean;
  controlName: string;
  @Output()
  change = new EventEmitter<boolean>();
  constructor() {
    this.controlName = "my" + Math.floor(Math.random() * 100);

  }
  ngOnInit(): void {
  }
  toggleValue() {
    this._value = !this._value;
    this.change.emit(this._value);
  }
}
