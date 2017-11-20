import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DoctorService } from 'app/masterdata/doctor/doctor.service';
import { DoctorModel } from 'app/masterdata/doctor/doctor.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() indexDoctorId: number;

  @Output() eventDoctor = new EventEmitter<DoctorModel>();
  
  statusProcess : string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        if (this.indexDoctorId != undefined || this.indexDoctorId != null){
          this.getSingleDoctor(this.indexDoctorId);
        }
      }
    )
  }

  ngOnChanges(change: SimpleChanges): void { 
    if (this.indexDoctorId != undefined || this.indexDoctorId != null){
    this.getSingleDoctor(change.indexDoctorId.currentValue);
      this.statusProcess = '';
    }
  }

  //model:any={};
  model = new DoctorModel();
  
  

  getSingleDoctor(id){
    this._doctorService
      .getDoctorById(id)
      .subscribe(doctor =>{
          this.model = doctor;
          })
  };
  
  updateDoctor(){
    if(this.model.doctorId == null || this.model.doctorId== 0 ){
      if (Object.keys(this.model).length != 0){
        this._doctorService
        .createDoctor(this.model)
        .subscribe(()=> this.goBack());

        this.eventDoctor.emit(this.model);
        this.statusProcess = "Add Data is Success!";
      }

    } else{
      this._doctorService
      .updateDoctor(this.model)
      .subscribe(()=> this.goBack());

      this.eventDoctor.emit(this.model);
      this.statusProcess = "Save Data is Success!";
    }
  }
  
  goBack(){
    this._doctorService.getAllDoctor();
    this.router.navigate(['/masterdata/doctor/home']);
  }

  tonggleAddReset(){
    this.model = new DoctorModel();
    this.statusProcess = '';
  }

}
