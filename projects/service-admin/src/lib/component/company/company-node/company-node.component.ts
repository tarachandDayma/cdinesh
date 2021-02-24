import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyModel } from '../../../models/company.model';

@Component({
  selector: 'lib-company-node',
  templateUrl: './company-node.component.html',
  styleUrls: ['./company-node.component.css']
})
export class CompanyNodeComponent implements OnInit {

  constructor() { }
  @Input()
  company: CompanyModel;
  @Output()
  remove: EventEmitter<CompanyModel> = new EventEmitter<CompanyModel>();
  @Output()
  Edit: EventEmitter<CompanyModel> = new EventEmitter<CompanyModel>();
  ngOnInit(): void {
  }
  EditNode(_company: CompanyModel) {
    this.Edit.emit(_company);
  }
  RemoveNode(_company: CompanyModel) {
    this.remove.emit(_company);
  }
  toggleNode(_company: CompanyModel) {
    _company.showDetail = !_company.showDetail;
    
  }
}
