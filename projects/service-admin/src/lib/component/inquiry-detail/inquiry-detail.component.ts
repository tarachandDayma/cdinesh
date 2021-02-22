import { Component, OnInit } from '@angular/core';
import { loaderserice } from 'service-common';

import { InquiryModel } from '../../models/inquiry.model';
import { InquiryService } from '../../service/inquirt.service';

@Component({
  selector: 'lib-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.css']
})
export class InquiryDetailComponent implements OnInit {

  inquiries:InquiryModel[]=[];
  constructor(private loader:loaderserice,private inquiryService:InquiryService) { }

  ngOnInit(): void {
    this.LoadInquireis();
  }
  LoadInquireis(){
    this.loader.show(true);
    this.inquiryService.GetInquiries().subscribe(result=>{
      this.loader.show(false);
      this.inquiries=result;
    },error=>{
      this.loader.show(false);
    })
  }
}
