import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Toast } from 'ngx-toastr';
import { alertserice, loaderserice } from 'service-common';
import { UserDownloadFieldsModel } from '../../models/user.download.fields.model';
import { UserDownloadMasterModel } from '../../models/user.download.master.model';
import { DownloadService } from '../../service/download.service';

@Component({
  selector: 'lib-download-setup',
  templateUrl: './download-setup.component.html',
  styleUrls: ['./download-setup.component.css']
})
export class DownloadSetupComponent implements OnInit {
  Fields: UserDownloadMasterModel[] = [];
  RemovedFields: UserDownloadMasterModel[] = [];
  constructor(private downloadService: DownloadService, private loader: loaderserice, private alertService: alertserice, public translate: TranslateService) { }

  ngOnInit(): void {
    this.LoadFields();
  }
  LoadFields() {
    this.Fields = [];
    this.loader.show(true);
    this.downloadService.LoadFields().subscribe(result => {
      this.loader.show(false);
      this.Fields = result;
    }, error => {
      this.loader.show(false);
    })
  }
  dragIndex: number;
  dragStar: boolean = false;
  mouseDown(indx) {
    this.dragIndex = indx;
    this.dragStar = true;
  }
  mouseMove(field,indx) {
    if (this.dragStar) {
      var _oldFields = JSON.parse(JSON.stringify(field.fieldsModels));
      field.fieldsModels.splice(this.dragIndex, 1);
      field.fieldsModels.splice(indx, 0, _oldFields[this.dragIndex]);
      this.dragIndex = indx;
    }
  }
  mouseUp(field,indx) {
    if (this.dragStar) {
      var _oldFields = JSON.parse(JSON.stringify(field.fieldsModels));
      field.fieldsModels.splice(this.dragIndex, 1);
      field.fieldsModels.splice(indx, 0, _oldFields[this.dragIndex]);
      this.dragIndex = indx;
      this.dragStar = false;
      this.dragIndex = null;
    }
  }

  saveFields() {
    var validate = true;
    this.Fields.forEach(element => {
      if (element.name == undefined || element.name == "" || element.name == null)
        validate = false;
      for (let index = 0; index < element.fieldsModels.length; index++) {
        element.fieldsModels[index].priority = index + 1;
      }
    });
    if (validate == true) {
      this.loader.show(true);
      this.downloadService.SaveFields(this.Fields).subscribe(result => {
        this.loader.show(false);
        if (result.status) {
          this.LoadFields();
          this.alertService.success(this.translate.instant(result.message), "");
        } else {
          this.alertService.Error(this.translate.instant(result.message), "");
        }
      }, error => {
        this.loader.show(false);
      });
      this.downloadService.RemoveFields(this.RemovedFields).subscribe(result => {
      }, error => {
      })
    } else {
      this.alertService.Error(this.translate.instant("inventory.profile.downloadSetup.formatName_error"), "");
    }
  }
  AddNewItem() {
    this.loader.show(true);
    this.downloadService.AddNew().subscribe(result => {
      this.loader.show(false);
      this.Fields.push(result);
    }, error => {
      this.loader.show(false);
    })
  }
  Remove(item: UserDownloadMasterModel) {
    if (this.RemovedFields == undefined || this.RemovedFields == null)
      this.RemovedFields = [];
    var indx = this.Fields.indexOf(item);
    this.RemovedFields.push(JSON.parse(JSON.stringify(item)));
    this.Fields.splice(indx, 1);
  }
  toggleDetail(item){
    item.showDetail=!item.showDetail;
  }
}
