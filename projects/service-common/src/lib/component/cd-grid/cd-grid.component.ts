import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'lib-cd-grid',
  templateUrl: './cd-grid.component.html',
  styleUrls: ['./cd-grid.component.css']
})
export class CdGridComponent implements OnInit {
  @ContentChild(TemplateRef) body;
  @ContentChild(TemplateRef) header;
  constructor() { }

  ngOnInit(): void {

  }

}
