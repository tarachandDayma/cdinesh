export class CompanyModel {
    companyId: string;
    companyName: string;
    parentCompanyId: string;
    children: CompanyModel[] = [];
    showDetail:boolean;
}