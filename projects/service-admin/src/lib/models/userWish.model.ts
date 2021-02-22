export class UserWishModel{
    id:number;
    searchData:string;
    query:string;
    userId:string;
    createdDate:Date;
    label:string;
    parentId:number;
    children:UserWishModel[]=[];
    showDetail:boolean;
}