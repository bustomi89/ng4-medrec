export class TreatmentDetailModel {
     treatmentDetailId : number;
	 modifiedOn : Date;
	 modifiedBy : String;
	 createdOn : Date;
	 createdBy : String;
	 treatmentId : number;
	 treatmentType : String;
	 treatmentDate : Date;
	 note : String;
	 doctorId : number;
	 receipt : String;

	 public setTreatmentId (treatmentId : number) {
		 this.treatmentId = treatmentId;
	 }
	 public setTreatmentType (treatmentType : string) {
		this.treatmentType = treatmentType;
	}
	public setTreatmentDate (treatmentDate : Date) {
		this.treatmentDate = treatmentDate;
	}
	public setNote (note : string) {
		this.note = note;
	}
	public setDoctorId (doctorId : number) {
		this.doctorId = doctorId;
	}
	public setReceipt (receipt : string) {
		this.receipt = receipt;
	}
}
