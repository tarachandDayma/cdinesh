import { UserAccountInfoModel } from './userAccountInfo.model';
import { UserAddressInfoModel } from './userAddressInfo.model';
import { UserBasicInfoModel } from './userBasicInfo.Model';
import { UserReferralInfo } from './userReferralInfo.model';

export class UserModel {
    constructor() {
            this.userName="";
            this.password="";
            this.confirmPassword="";
            this.sellerId="";
            this.captchCode="";
            this.userBasicInfo= new UserBasicInfoModel();
            this.userAddressInfo= new UserAddressInfoModel();
            this.userAccountInfo= new UserAccountInfoModel();
            this.userReferralInfo=[];
    }
    id: string;
    userName: string;
    fullName:string;
    password: string;
    confirmPassword: string;
    sellerId:string;
    captchCode:string;
    emailId:string;
    isActive:boolean;
    allowStockAPI:boolean;
    allowWebsite:boolean;
    allowMobileApp:boolean;
    isAutoMail:boolean;
    isFullStock:boolean;
    allowDeskApp:boolean;
    aownloadOfflineStock:boolean;
    allowFTP:boolean;
    allowHoldAPI:boolean;
    allowForum:boolean;
    sendMailCopytoClient:boolean;
    isExclusive:boolean;
    isEmailSubscribe:boolean;
    ftpHost:string;
    ftpPassword:string;
    ftpPort:number;
    ftpFileName:string;
    RoleId:boolean;
    companyName:string;
    billingCountryName:string;
    billingStateName:string;
    billingCityName:string;
    shippingCountryName:string;
    shippingStateName:string;
    shippingCityName:string;
    sellerEmailId:string;
    roles:string;
    diafelxuserId:number;
    userBasicInfo: UserBasicInfoModel;
    userAddressInfo: UserAddressInfoModel;
    userAccountInfo: UserAccountInfoModel;
    userReferralInfo: UserReferralInfo[];
    
}