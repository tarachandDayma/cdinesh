import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lib-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent implements OnInit, OnChanges {

  @Input()
  dataSource: any[];
  @Input()
  displaymember: any;
  @Input()
  displaymember1: any;
  selectedClient: any;
  @Output()
  selectedChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  SearchChange: EventEmitter<any> = new EventEmitter<any>();
  SearchText: string;
  dataList: any[];
  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {

  }
  SelectClient(item: any) {
    this.selectedClient = item;
    this.selectedChange.emit(item);
  }
  myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  LoadList(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.SearchChange.emit(this.SearchText);
    }
  }
}
