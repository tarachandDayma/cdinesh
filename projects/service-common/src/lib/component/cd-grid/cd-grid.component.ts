import { AfterViewInit, Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'lib-cd-grid',
  templateUrl: './cd-grid.component.html',
  styleUrls: ['./cd-grid.component.css']
})
export class CdGridComponent implements OnInit ,OnChanges,AfterViewInit {
  @Input() datasource: any[];
  @Input() recordrerpage: number;
  data: any[];
  
  @ContentChild(TemplateRef) cdbody;
  currentPageNo: number = 0;
  PageCount: number = 0;
  Pages: any[];
  PageNos: number[] = [];
  FirstPageNo: number = 1;
  LastPageNo: number = 4;
  constructor() { }
  ngAfterViewInit(): void {
    $(this.cdbody.nariveElement)
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.PageCount = Math.ceil(this.datasource.length / this.recordrerpage);
    var RecordNumber = 0;
    this.Pages = [];
    this.PageNos = [];
    for (var i = 0; i < this.PageCount; i++) {
      this.Pages.push(new Array());
      this.PageNos.push(i);
      var k = 0;
      for (var j = RecordNumber; j < this.datasource.length; j++) {
        this.Pages[this.Pages.length - 1].push(this.datasource[j]);
        RecordNumber++;
        k++;
        if (k >= this.recordrerpage) {
          break;
        }
      }
    }
  }
  pressed = false;
  start: any;
  startX: any;
  startWidth: any;
  ngOnInit(): void {
     
  }
  FirstPage(): void {
    this.currentPageNo = 0;
  }
  PrevPage(): void {
    if (this.currentPageNo > 0)
      this.currentPageNo = this.currentPageNo - 1;
  }
  NextPage(): void {
    if (this.currentPageNo < this.Pages.length - 1)
      this.currentPageNo = this.currentPageNo + 1;
  }

  LastPage(): void {
    this.currentPageNo = this.Pages.length - 1;
  }

}
