import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { HospitalModel } from 'app/transaction/hospital/hospital.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HospitalService } from 'app/transaction/hospital/hospital.service';
import { TreatmentDetailModel } from 'app/transaction/hospital/treatment-detail.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap';
import { TreatmentDetailService } from 'app/transaction/hospital/treatment-detail.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  treatmentDetailId: any;
  treatmentId: any;
  treatmentType: any;
  treatmentDate: any;
  note: any;
  doctorId: any;
  receipt: any;
  
  treatmentDetailArray = [];
  treatmentDetail = new TreatmentDetailModel();
  customSelected: string;
  t_treatmentId : number;
  t_treatmentType : string;
  hospital = new HospitalModel();
  // model = new HospitalModel();

  selected = [];
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('mdModal') modal:ModalDirective;

  @Input() indexTreatmentId: number;
  @Output() eventHospital = new EventEmitter<HospitalModel>();
    
    statusProcess : string;
    
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _hospitalService: HospitalService,
      private _TreatmentDetailService: TreatmentDetailService
    ) { }
  
    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.indexTreatmentId = +params['id']; // casting dari string ke number
          this.getSingleHospital(this.route.snapshot.params['id']);
          // if (this.indexTreatmentId != undefined || this.indexTreatmentId != null){
          //   this.getSingleHospital(this.indexTreatmentId);
          // }
        }
      )
    }
  
    // ngOnChanges(change: SimpleChanges): void { 
    //   if (this.indexTreatmentId != undefined || this.indexTreatmentId != null){
    //   this.getSingleHospital(change.indexTreatmentId.currentValue);
    //     this.statusProcess = '';
    //   }
    // }
  
    //model:any={};
    
    getSingleHospital(id){
      this._hospitalService
        .getHospitalById(id)
        .subscribe(hospital =>{
            this.hospital = hospital;
            console.log(JSON.stringify(hospital));
            // hospital.treatmentDetail.forEach(element => {
              
            // });
            // this.treatmentDetailArray = hospital.treatmentDetail;
            // console.log(hospital.treatmentDetail);
            
            hospital.treatmentDetail.forEach(element => {
              this.treatmentDetail = element;
              this.treatmentDetailArray.push(this.treatmentDetail);  
            });
            

            })
    };
    
    updateHospital(){
      if(this.hospital.treatmentId == null || this.hospital.treatmentId== 0 ){
        if (Object.keys(this.hospital).length != 0){
          this.hospital.treatmentDetail = this.treatmentDetailArray;
          this._hospitalService
          .createHospital(this.hospital)
          .subscribe(()=> this.goBack());
  
          this.eventHospital.emit(this.hospital);
          this.statusProcess = "Add Data is Success!";
        }
  
      } else{
        this.hospital.treatmentDetail = this.treatmentDetailArray;
        this._hospitalService
        .updateHospital(this.hospital)
        .subscribe(()=> this.goBack());
  
        this.eventHospital.emit(this.hospital);
        this.statusProcess = "Save Data is Success!";
      }
    }
    
    goBack(){
      this._hospitalService.getAllHospital();
      this.router.navigate(['/transaction/hospital/home']);
    }
  
    tonggleAddReset(){
      this.hospital = new HospitalModel();
      this.statusProcess = '';
    }

    onSubmit($event){
      
      if (this.treatmentDetailId == null) {
        let countArray = this.treatmentDetailArray.length;
        this.treatmentDetailArray.push($event);
    
        this.treatmentDetailArray[countArray].doctorId = this.doctorId;
        this.treatmentDetailArray[countArray].note = this.note;
        this.treatmentDetailArray[countArray].receipt = this.receipt;
        this.treatmentDetailArray[countArray].treatmentDate = this.treatmentDate;
        this.treatmentDetailArray[countArray].treatmentId = this.hospital.treatmentId;
        this.treatmentDetailArray[countArray].treatmentType = this.treatmentType;
      } else {
        for(let i=0; i < this.treatmentDetailArray.length; i++){
          if (this.treatmentDetailArray[i].treatmentId == this.hospital.treatmentId){
            this.treatmentDetailArray[i].doctorId = this.doctorId;
            this.treatmentDetailArray[i].note = this.note;
            this.treatmentDetailArray[i].receipt = this.receipt;
            this.treatmentDetailArray[i].treatmentDate = this.treatmentDate;
            this.treatmentDetailArray[i].treatmentId = this.hospital.treatmentId;
            this.treatmentDetailArray[i].treatmentType = this.treatmentType;
          }
        }
      }
      
      
      // alert(this.doctorId + this.note + this.receipt + this.treatmentDate + this.treatmentId + this.treatmentType);
      // this._TreatmentDetailService
      // .createTreatmentDetail(this.treatmentDetail)
      // .subscribe(()=> this.modal.hide());
      this.table.ngDoCheck();
      this.modal.hide();
    }

    modalTreatmentDetail() {
      this.doctorId = null;
      this.treatmentDate = null;
      this.treatmentType = null;
      this.note = null;
      this.receipt = null;
      this.modal.show();
    }
}
