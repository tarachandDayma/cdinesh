import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropDownService } from '../../services/dropdown.service';

@Component({
  selector: 'lib-cddropdown',
  templateUrl: './cddropdown.component.html',
  styleUrls: ['./cddropdown.component.css']
})
export class CDDropdownComponent implements OnInit, OnChanges {

  @Input("modelkey")
  returnkey: string;
  @Input("modelvalue")
  returnVal: string;
  _value: string;
  data: any[];
  @Input("path")
  path: string;
  @Input("entitypath")
  entitypath: string;
  @Input("params")
  params: string;
  @Input("valuemember")
  valueMember: string;
  @Input("displaymember")
  displaymember: string;
  @Input() form: FormGroup;
  @Input("formcontrolname")
  _formcontrolname: string;
  showDropdown: boolean = false;
  currentIndex: number = 0;
  @Output()
  change = new EventEmitter<any>();
  scrollHeight: number = 0;
  showloading: boolean = false;
  valChange: boolean = false;
  singleData: any;
  constructor(private dropDownService: DropDownService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.returnVal = this._value;
    if (this.entitypath == null || this.entitypath == undefined || this.entitypath == "")
      return;
    if (this.returnkey != null && this.returnkey != undefined) {
     
      
        this.showloading = true;
        this.dropDownService.loadData(this.entitypath + "?id=" + this.returnkey).subscribe(result => {
          this.showloading = false;
          try {
            this.data = [];
            this.data.push(result);
            this._value = this.data[0][this.displaymember];
            this.change.emit({ id: this.returnkey, value: this._value });
          } catch (error) {

          } 
        }, error => {
          this.showloading = false;
          console.error(error);
        });
      

    }
  }
  ngOnInit(): void {
    this.data = [];
    this.loadData();
  }
  keypress(event) {
    if (this.showDropdown == false) {
      this.showDropdown = true;
      return;
    }
    if (event.keyCode == 38) { // up key
      if (this.currentIndex > 0) {
        this.currentIndex = this.currentIndex - 1;
      } else {
        this.currentIndex = this.data.length - 1;
      }
    } else if (event.keyCode == 40) { // down key

      if (this.data.length - 1 > this.currentIndex) {
        this.currentIndex = this.currentIndex + 1;
      } else {
        this.currentIndex = 0;
      }
    } else if (event.keyCode == 37) { // left key

    } else if (event.keyCode == 39) { // right key

    } else if (event.keyCode == 45) { // delete key

    } else if (event.keyCode == 46) { // insert key

    } else if (event.shiftKey) { // shift key

    } else if (event.altKey) { // alt key

    } else if (event.ctrlKey) { // ctrl key

    } else if (event.metaKey) { // meta key

    } else if (event.keyCode == 120) { // home key

    } else if (event.keyCode == 121) { // end key

    } else {
      this.loadData();
    }
  }
  keydown(event: any) {

    if (event.key === "Enter") {
      var frm = this;
      if (frm.data.length > 0) {
        try {
          frm.returnkey = frm.data[this.currentIndex][this.valueMember];
          frm.returnVal = frm.data[this.currentIndex][this.displaymember];
          frm._value = frm.data[this.currentIndex][this.displaymember];
        } catch (error) {

        }

        frm.showDropdown = false;
        frm.change.emit({ id: frm.returnkey, value: frm._value });
      } else {
        frm.showDropdown = false;
        frm.change.emit({ id: null, value: frm._value });
      }
      event.stopPropagation();
      return false;
    }
  }
  loadData() {
    this.showloading = true;
    this.dropDownService.loadData(this.path + "?searchText=" + this._value + (this.params == undefined ? "" : this.params)).subscribe(result => {
      this.showloading = false;
      this.data = result;
    }, error => {
      this.showloading = true;
      console.error(error);
    });
  }
  mouseclick(index) {

    this.currentIndex = index;
    var frm = this;
    if (frm.data.length > 0) {
      try {
        frm.returnkey = frm.data[this.currentIndex][this.valueMember];
        frm.returnVal = frm.data[this.currentIndex][this.displaymember];
        frm._value = frm.data[this.currentIndex][this.displaymember];
      } catch (error) {

      }

      frm.showDropdown = false;
      frm.change.emit({ id: frm.returnkey, value: frm._value });
    } else {
      frm.change.emit({ id: null, value: frm._value });
    }
  }
  focusout() {
    var frm = this;
    setTimeout(() => {
      if (frm.data.length > 0 && frm._value != "" && frm._value != undefined) {
        try {
          frm.returnkey = frm.data[this.currentIndex][this.valueMember];
          frm.returnVal = frm.data[this.currentIndex][this.displaymember];
          frm._value = frm.data[this.currentIndex][this.displaymember];
        } catch (error) {

        }

        frm.showDropdown = false;
        frm.change.emit({ id: frm.returnkey, value: frm._value });
      } else {
        frm.showDropdown = false;
        frm.change.emit({ id: null, value: frm._value });
      }
    }, 100);
  }
  scrollPosFunction() {
    try {

      var elmnt = document.getElementById("ctmdropdown");
      this.scrollHeight = elmnt.scrollHeight;

      if (this.scrollHeight > 0 && this.data.length > 0) {
        var eachComponentHeight = this.scrollHeight / this.data.length;
        document.getElementById("ctmdropdown").scrollTop = eachComponentHeight * this.currentIndex;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

