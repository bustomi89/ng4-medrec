import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClinicService } from 'app/masterdata/clinic/clinic.service';
import { ClinicModel } from 'app/masterdata/clinic/clinic.model';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,  OnChanges{
  
  @Input() indexClinicId: number;

  @Output() eventClinices = new EventEmitter<ClinicModel>();

  statusProcess : string;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _clinicService: ClinicService
    ) { }
  
    ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          // this.indexClinicId = +params['id']; // casting dari string ke number
          if (this.indexClinicId != undefined || this.indexClinicId != null){
            this.getSingleClinic(this.indexClinicId);
          }
        }
      )
        // this.getSingleClinic(this.route.snapshot.params['id']);
    }

    ngOnChanges(change: SimpleChanges): void { 
      if (this.indexClinicId != undefined || this.indexClinicId != null){
      this.getSingleClinic(change.indexClinicId.currentValue);
        this.statusProcess = '';
      }
    }
  
    //model:any={};
    clinic = new ClinicModel();
    
    
  
    getSingleClinic(id){
      this._clinicService
        .getClinicById(id)
        .subscribe(clinic =>{
            this.clinic = clinic;
            })
    };
    
    updateClinic(){
      if(this.clinic.branchId == null || this.clinic.branchId== 0 ){
          if (Object.keys(this.clinic).length != 0){
            this._clinicService
            .createClinic(this.clinic)
            .subscribe(()=> this.goBack());

            this.eventClinices.emit(this.clinic);
            this.statusProcess = "Add Data is Success!";
          }

      } else{
        this._clinicService
        .updateClinic(this.clinic)
        .subscribe(()=> this.goBack());

        this.eventClinices.emit(this.clinic);
        this.statusProcess = "Save Data is Success!";
      }
      
    }
   
     goBack(){
      this._clinicService.getAllClinics();
      this.router.navigate(['/masterdata/clinic/home']);
    }

    tonggleAddReset(){
      this.clinic = new ClinicModel();
      this.statusProcess = '';
    }
}
