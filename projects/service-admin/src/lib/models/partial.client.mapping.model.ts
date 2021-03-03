import { UserModel } from "./user/user.model";

export class PartialClientMappingModel{
    id:number;
    sellerId:string;
    clientId:string;
    domainId:string;
    seller:UserModel;
    clients:UserModel[]=[];
}