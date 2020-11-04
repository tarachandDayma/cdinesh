import { Injectable } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { RejectedResponse } from './model/RejectedResponse';
declare var $ :any;

@Injectable({
    providedIn:"root"
})
export class FormValidationService {
    title: string;
    // private lastInserted: number[] = [];

    constructor() {
    }

    public BindServerErrors(formGroup: FormGroup, rejected: any) {
        try {
            Object.keys(rejected.errors).forEach(prop => {
                var fieldName=prop[0].toLocaleLowerCase()+prop.substr(1,prop.length);
                fieldName=fieldName.split(".")[fieldName.split(".").length-1];
                Object.keys(formGroup.controls).forEach(key => {
                    if(fieldName.toLocaleLowerCase()==key.toLocaleLowerCase()){
                        const formControl = formGroup.get(key);
                        if (formControl) {
                            formControl.setErrors({ serverError: rejected.errors[prop][0] });
                        }
                    }
                  });
                
            }); 
        } catch (_error) {
            Object.keys(rejected.error.errors).forEach(prop => {
                var fieldName=prop[0].toLocaleLowerCase()+prop.substr(1,prop.length);
                fieldName=fieldName.split(".")[fieldName.split(".").length-1];
                Object.keys(formGroup.controls).forEach(key => {
                    if(fieldName.toLocaleLowerCase()==key.toLocaleLowerCase()){
                        const formControl = formGroup.get(key);
                        if (formControl) {
                            formControl.setErrors({ serverError: rejected.error.errors[prop][0] });
                        }
                    }
                    // else if(fieldName.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) > -1){
                    //     const formControl = formGroup.get(key);
                    //     if (formControl) {
                    //         formControl.setErrors({ serverError: rejected.error.errors[prop][0] });
                    //     }
                    // }
                  });
                
            }); 
        } 
        
    }

   
}


