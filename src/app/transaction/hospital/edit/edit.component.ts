import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HospitalModel } from 'app/transaction/hospital/hospital.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HospitalService } from 'app/transaction/hospital/hospital.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() indexTreatmentId: number;
  
    @Output() eventHospital = new EventEmitter<HospitalModel>();
    
    statusProcess : string;
    
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _hospitalService: HospitalService
    ) { }
  
    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          if (this.indexTreatmentId != undefined || this.indexTreatmentId != null){
            this.getSingleHospital(this.indexTreatmentId);
          }
        }
      )
    }
  
    ngOnChanges(change: SimpleChanges): void { 
      if (this.indexTreatmentId != undefined || this.indexTreatmentId != null){
      this.getSingleHospital(change.indexTreatmentId.currentValue);
        this.statusProcess = '';
      }
    }
  
    //model:any={};
    model = new HospitalModel();
    
    
  
    getSingleHospital(id){
      this._hospitalService
        .getHospitalById(id)
        .subscribe(hospital =>{
            this.model = hospital;
            })
    };
    
    updateHospital(){
      if(this.model.treatmentId == null || this.model.treatmentId== 0 ){
        if (Object.keys(this.model).length != 0){
          this._hospitalService
          .createHospital(this.model)
          .subscribe(()=> this.goBack());
  
          this.eventHospital.emit(this.model);
          this.statusProcess = "Add Data is Success!";
        }
  
      } else{
        this._hospitalService
        .updateHospital(this.model)
        .subscribe(()=> this.goBack());
  
        this.eventHospital.emit(this.model);
        this.statusProcess = "Save Data is Success!";
      }
    }
    
    goBack(){
      this._hospitalService.getAllHospital();
      this.router.navigate(['/transaction/hospital/home']);
    }
  
    tonggleAddReset(){
      this.model = new HospitalModel();
      this.statusProcess = '';
    }

}
