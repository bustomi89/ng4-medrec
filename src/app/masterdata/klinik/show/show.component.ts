import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClinicService } from 'app/masterdata/klinik/klinik.service';
import { ClinicModel } from 'app/masterdata/klinik/klinik.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _clinicService: ClinicService
  ) { }

  ngOnInit() {
    this.getSingleClinic();
  }
  
  clinic:ClinicModel;

  getSingleClinic(){
    var id = this.route.snapshot.params['id'];
    this._clinicService
      .getClinic(id)
      .subscribe(clinic =>{
          this.clinic = clinic[0];
          })
  };

  goBack(){
    this.router.navigate(['/masterdata/klinik/home']);
  }
}
