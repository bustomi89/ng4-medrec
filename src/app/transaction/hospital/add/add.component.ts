import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from 'app/transaction/hospital/hospital.service';
import { RegistrationModel } from 'app/transaction/registration/registration.model';
import { HospitalModel } from 'app/transaction/hospital/hospital.model';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TreatmentDetailService } from 'app/transaction/hospital/treatment-detail.service';
import { TreatmentDetailModel } from 'app/transaction/hospital/treatment-detail.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
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

  selected = [];
  onSelect(event){
    // // console.log("onSelect "+JSON.stringify(event));
    // if (this.flag_delete == true){
    //   this.statusFormEdit = false;
    //   this.flag_delete = false;
    // } else {
    //   this.statusFormEdit = true;
    // }

    // this.indexTreatmentId = event.selected[0].treatmentId;
  }
  

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('mdModal') modal:ModalDirective;
  
    constructor(
      private _HospitalService: HospitalService,
       private router: Router,
       private _TreatmentDetailService: TreatmentDetailService
      ) { }
  
    ngOnInit() {
    }
  
    ngAfterViewInit(){
      // this.getTreatmentDetail();
    }

    getTreatmentDetail(){
      this._TreatmentDetailService.getTreatmentDetailbyTreatmentId()
          .subscribe(data=> {
            // cache our list
            this.treatmentDetailArray = data;
          } );
    }

    typeaheadOnSelect(event){
      console.log("event "+JSON.stringify(event));
      this.t_treatmentId = event.item.treatmentId;
  
      this.hospital.treatmentId = this.t_treatmentId;
      this.t_treatmentType = event.item.treatmentType;
  
    }

  addTreatmentDetail(){
        this._TreatmentDetailService
          .createTreatmentDetail(this.treatmentDetail)
          .subscribe(()=> this.goBack());
    }
     goBack(){
      this.router.navigate(['/transaction/hospital/home']);
    }

  addHospital() {
    this._HospitalService
    .createHospital(this.hospital)
    .subscribe(()=> this.goBack());
  }

  modalTreatmentDetail() {
    this.doctorId = null;
    this.treatmentDate = null;
    this.treatmentType = null;
    this.note = null;
    this.receipt = null;
    this.modal.show();
  }

  onSubmit($event){

    let countArray = this.treatmentDetailArray.length;
    this.treatmentDetailArray.push($event);

    this.treatmentDetailArray[countArray].doctorId = this.doctorId;
    this.treatmentDetailArray[countArray].note = this.note;
    this.treatmentDetailArray[countArray].receipt = this.receipt;
    this.treatmentDetailArray[countArray].treatmentDate = this.treatmentDate;
    this.treatmentDetailArray[countArray].treatmentId = this.treatmentId;
    this.treatmentDetailArray[countArray].treatmentType = this.treatmentType;
    
    // alert(this.doctorId + this.note + this.receipt + this.treatmentDate + this.treatmentId + this.treatmentType);
    // this._TreatmentDetailService
    // .createTreatmentDetail(this.treatmentDetail)
    // .subscribe(()=> this.modal.hide());
    this.table.ngDoCheck();
    this.modal.hide();
  }
}
