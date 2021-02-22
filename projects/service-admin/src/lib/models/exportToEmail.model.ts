import { UserDownloadMasterModel } from "./user.download.master.model";

export class ExportToEmailModel{
    subject:string;
    mailTo:string;
    mailCC:string;
    message:string;
    filter:any;   
    UserDownload:UserDownloadMasterModel;   
}