import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClinicService } from 'app/masterdata/klinik/klinik.service';
import { ClinicModel } from 'app/masterdata/klinik/klinik.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _clinicService: ClinicService
  ) { }

  ngOnInit() {
      this.getSingleClinic();
  }

  //model:any={};
  model = new ClinicModel();
  
  id = this.route.snapshot.params['id'];

  getSingleClinic(){
    this._clinicService
      .getClinic(this.id)
      .subscribe(clinic =>{
          this.model = clinic[0];
          })
  };
  
  updateClinic(){
      this._clinicService
        .updateClinic(this.model)
        .subscribe(()=> this.goBack());
  }
 
   goBack(){
    this.router.navigate(['/masterdata/klinik/home']);
  }
}
