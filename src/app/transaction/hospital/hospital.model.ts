import { TreatmentDetailModel } from "app/transaction/hospital/treatment-detail.model";

export class HospitalModel {
    modifiedOn:Date;
    modifiedBy:string;
    createdOn:Date;
    createdBy:string;
    treatmentId:number;
    petId:number;
    treatmentPlan:string;
    recommendation:string;
    reminder:Date;
    treatmentDetail : TreatmentDetailModel[];

}
