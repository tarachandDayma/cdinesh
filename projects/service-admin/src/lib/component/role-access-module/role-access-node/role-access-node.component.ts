import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleModel } from '../../../models/role.model';

@Component({
  selector: 'lib-role-access-node',
  templateUrl: './role-access-node.component.html',
  styleUrls: ['./role-access-node.component.css']
})
export class RoleAccessNodeComponent implements OnInit {

  constructor() { }
  @Input()
  node: RoleModel;
  @Output()
  remove: EventEmitter<RoleModel> = new EventEmitter<RoleModel>();
  @Output()
  Edit: EventEmitter<RoleModel> = new EventEmitter<RoleModel>();
  @Output()
  EditCriterai: EventEmitter<RoleModel> = new EventEmitter<RoleModel>();
  ngOnInit(): void {
  }
  EditNode(role: RoleModel) {
    this.Edit.emit(role);
  }
  RemoveNode(role: RoleModel) {
    this.remove.emit(role);
  }
  toggleNode(role: RoleModel) {
    role.showDetail = !role.showDetail;
  }
  EditRoleCriterai(role: RoleModel) {
    this.EditCriterai.emit(role);
  }

}
