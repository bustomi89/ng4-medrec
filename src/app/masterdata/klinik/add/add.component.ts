import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'app/masterdata/klinik/klinik.service';
import { Router } from '@angular/router';
import { ClinicModel } from 'app/masterdata/klinik/klinik.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private _clinicService: ClinicService,
     private router: Router) { }

  ngOnInit() {
  }

  model = new ClinicModel();

  addClinic(){
      this._clinicService
        .addClinic(this.model)
        .subscribe(()=> this.goBack());
  }
  
   goBack(){
    this.router.navigate(['/masterdata/klinik/home']);
  }
}