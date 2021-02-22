export class RoleModel{
    id:string;
    name:string;
    normalizedName:string;
    concurrencyStamp:string;
    domainId:string;
    parentRoleId:string;
    children:RoleModel[]=[];
    showDetail:boolean;
}