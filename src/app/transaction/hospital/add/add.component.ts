import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'app/transaction/hospital/hospital.service';
import { Router } from '@angular/router';
import { HospitalModel } from 'app/transaction/hospital/hospital.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private _hospitalService: HospitalService,
     private router: Router) { }

  ngOnInit() {
  }

  model = new HospitalModel();
  addHospital(){
      this._hospitalService
        .createHospital(this.model)
        .subscribe(()=> this.goBack());
  }
    goBack(){
    this.router.navigate(['/transaction/hospital/home']);
  }

}
