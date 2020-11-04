import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'lib-cdmulitselect',
  templateUrl: './cdmulitselect.component.html',
  styleUrls: ['./cdmulitselect.component.css']
})
export class CdmulitselectComponent implements OnInit {
  @Input("modelkey")
  returnkey: string;
  _value: string = "";
  @Input("datasource")
  data: any[];
  filterdata: any[];
  selectedItem: any[];
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
  returndata: string;
  controlName: string;
  constructor() {
    this.controlName = "my" + Math.floor(Math.random() * 100);
  }
  ngOnChanges(changes: SimpleChanges): void {

    try {
      this.filterdata = this.data;
      if (this.returnkey != undefined && this.data != undefined) {
        this.selectedItem = [];
        var valary = this.returnkey.split(',');
        valary.forEach(element => {
          try {
            var item = this.data.filter(x => { return x[this.valueMember] == element })[0]
            this.selectedItem.push({ id: item[this.valueMember], name: item[this.displaymember] })
            var _returndata = "";
            for (let i = 0; i < this.selectedItem.length; i++) {
              const element = this.selectedItem[i];
              if (_returndata == "")
                _returndata = this.selectedItem[i][this.valueMember];
              else
                _returndata = _returndata + "," + this.selectedItem[i][this.valueMember];
            }
            this.returndata = _returndata;
          } catch (error) {

          }
        });
        this.emitdata();
      }
    } catch (error) {

    }

  }
  ngOnInit(): void {

    this.selectedItem = [];
    setTimeout(() => {
      this.setControlWidths();
    }, 100);
  }
  keypress(event) {
    if (this.showDropdown == false) {
      this.showDropdown = true;
    }
    this._value = $("#" + this.controlName).val();
    if (event.keyCode == 38) { // up key
      if (this.currentIndex > 0) {
        this.currentIndex = this.currentIndex - 1;
      } else {
        this.currentIndex = this.data.length - 1;
      }
    } else if (event.keyCode == 40) { // down key

      if (this.filterdata.length - 1 > this.currentIndex) {
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

    } else if (event.keyCode == 8) { // end key
      if (this._value == "") {
        var item = this.returndata.split(",");
        // this._value=item[item.length-1];
        item.splice(item.length - 1, 1);
        this.returndata = item.toString();
        this.emitdata();
      }
    } else {
      this.loadData();
    }
  }
  keydown(event: any) {
    if (event.key === "Enter") {
      if (this.selectedItem.filter(x => { return x[this.valueMember] == this.data[this.currentIndex][this.valueMember] }).length <= 0) {
        this.selectedItem.push({ id: this.data[this.currentIndex][this.valueMember], name: this.data[this.currentIndex][this.displaymember] })
        this.emitdata();
      }
      this.showDropdown = false;
      event.stopPropagation();
      return false;
    }
  }
  loadData() {

    this.filterdata = this.data.filter(x => { return x[this.displaymember].indexOf(this._value) > -1 });
  }
  removeselectedItem(item) {
    this.selectedItem.splice(this.selectedItem.indexOf(item), 1);
  }
  emitdata() {
    var _returndata = "";
    for (let i = 0; i < this.selectedItem.length; i++) {
      const element = this.selectedItem[i];
      if (_returndata == "")
        _returndata = this.selectedItem[i][this.valueMember];
      else
        _returndata = _returndata + "," + this.selectedItem[i][this.valueMember];
    }
    this.returndata = _returndata;
    this.change.emit({ id: this.returndata });
    this.setControlWidths();
  }
  mouseclick(index) {
    this.currentIndex = index;
    if (this.selectedItem.filter(x => { return x[this.valueMember] == this.data[this.currentIndex][this.valueMember] }).length <= 0) {
      this.selectedItem.push({ id: this.data[this.currentIndex][this.valueMember], name: this.data[this.currentIndex][this.displaymember] })
    }
    this.emitdata();
    this.showDropdown = false;
  }
  divclick() {
    $("#" + this.controlName).focus();
    this.setControlWidths();
    this.filterdata = this.data;
    if (this.showDropdown == false) {
      this.showDropdown = true;
      return;
    }
  }
  focusIn() {
    this.setControlWidths();
    this.filterdata = this.data;
    if (this.showDropdown == false) {
      this.showDropdown = true;
      return;
    }
  }
  focusout() {
    var frm = this;
    setTimeout(() => {
      frm.showDropdown = false;
    }, 1000);
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
  setControlWidths() {
    var divheight = document.getElementById(this.controlName + "div").offsetHeight;
    // var divwidth=document.getElementById(this.controlName+"div").offsetWidth;
    // var spanheight=document.getElementById(this.controlName+"span").offsetHeight;
    // document.getElementById(this.controlName+"control").style.width=(divwidth-spanheight)+"px";
    document.getElementById(this.controlName + "divdropdown").style.top = (divheight + 30) + "px";
  }
}
