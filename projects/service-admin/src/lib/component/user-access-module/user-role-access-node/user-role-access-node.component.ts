import { Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { RoleModel } from '../../../models/role.model';

@Component({
  selector: 'lib-user-role-access-node',
  templateUrl: './user-role-access-node.component.html',
  styleUrls: ['./user-role-access-node.component.css']
})
export class UserRoleAccessNodeComponent implements OnInit {

  constructor() { }
  @Input()
  node: RoleModel;
  @Output()
  remove: EventEmitter<RoleModel> = new EventEmitter<RoleModel>();
  @Output()
  Edit: EventEmitter<RoleModel> = new EventEmitter<RoleModel>();
  ngOnInit(): void {
  }
  EditNode(role: RoleModel) {
    this.Edit.emit(role);
  }
  toggleNode(role: RoleModel) {
    role.showDetail = !role.showDetail;
  }
}
