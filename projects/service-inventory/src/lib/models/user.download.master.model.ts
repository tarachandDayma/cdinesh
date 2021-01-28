import { UserDownloadFieldsModel } from "./user.download.fields.model";

export class UserDownloadMasterModel{
    id:number;
    name:string;
    percentage:number;
    userId:string;
    fieldsModels:UserDownloadFieldsModel[]=[];
}