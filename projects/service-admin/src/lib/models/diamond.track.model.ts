import { DecimalPipe } from "@angular/common";

export class DiamondTrackModel{
    id:number;
    packetNo:string;
    trackDate:Date;
    trackTillDate:Date;
    price:number;
    back:number;
    rapPrice:number;
    isActive:boolean;
    trackType:string;
    userId:string;
    clientId:string;
    currrentPrice:number;
    currrentBack:number;
    currrentRapPrice:number;
}