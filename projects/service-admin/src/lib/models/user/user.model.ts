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
    id:string;
    userName: string;
    password: string;
    confirmPassword: string;
    sellerId:string;
    captchCode:string;
    userBasicInfo: UserBasicInfoModel;
    userAddressInfo: UserAddressInfoModel;
    userAccountInfo: UserAccountInfoModel;
    userReferralInfo: UserReferralInfo[];
    
}