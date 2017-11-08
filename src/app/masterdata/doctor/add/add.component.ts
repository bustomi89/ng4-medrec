import { Component, OnInit } from '@angular/core';
import { DoctorModel } from 'app/masterdata/doctor/doctor.model';
import { DoctorService } from 'app/masterdata/doctor/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private _doctorService: DoctorService,
     private router: Router) { }

  ngOnInit() {
  }

  model = new DoctorModel();
  addDoctor(){
      this._doctorService
        .createDoctor(this.model)
        .subscribe(()=> this.goBack());
  }
  goBack(){
    this.router.navigate(['/masterdata/doctor/home']);
  }

}
