import { Component, Input, OnInit } from '@angular/core';
import { diamondsearchResult } from 'dist/service-inventory/lib/models/diamond.result.model';

@Component({
  selector: 'lib-diamond-offer',
  templateUrl: './diamond-offer.component.html',
  styleUrls: ['./diamond-offer.component.css']
})
export class DiamondOfferComponent implements OnInit {

  @Input("diamonds")
  diamonds:diamondsearchResult[]=[];
  constructor() { }

  ngOnInit(): void {
    
  }

}
