import { Component, OnInit, Input } from '@angular/core';
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
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.indexDoctorId = +params['id']; // casting dari string ke number
        this.getSingleDoctor(this.indexDoctorId);
      }
    )
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
      this._doctorService
        .updateDoctor(this.model)
        .subscribe(()=> this.goBack());
        this._doctorService.getAllDoctor();
  }
  
  goBack(){
    this._doctorService.getAllDoctor();
    this.router.navigate(['/masterdata/doctor/home']);
  }

}
