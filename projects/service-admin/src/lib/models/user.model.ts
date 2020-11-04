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
    userName: string;
    password: string;
    confirmPassword: string;
    sellerId:string;
    captchCode:string;
    companyName:string;
    emailId:string;
    billingCountryName:string;
    billingStateName:string;
    billingCityName:string;
    shippingCountryName:string;
    shippingStateName:string;
    shippingCityName:string;
    allowDeskApp:boolean;
    allowForum:boolean;
    allowFTP:boolean;
    allowHoldAPI:boolean;
    allowMobileApp:boolean;
    allowWebsite:boolean;
    ftpFileName:string;
    ftpHost:string;
    ftpPassword:string;
    ftpPort:string;
    isActive:boolean;
    isAutoMail :boolean;
    isEmailSubscribe:boolean;
    isExclusive:boolean;
    isIsFullStock:boolean;
    allowStockAPI:boolean;
    isPartial:boolean;
    sendMailCopytoClient:boolean;
    userBasicInfo: UserBasicInfoModel;
    userAddressInfo: UserAddressInfoModel;
    userAccountInfo: UserAccountInfoModel;
    userReferralInfo: UserReferralInfo[];
}