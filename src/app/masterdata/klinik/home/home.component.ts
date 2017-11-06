import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicService } from 'app/masterdata/klinik/klinik.service';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    require('smartadmin-plugins/datatables/datatables.min.css')
  ]
})

export class HomeComponent implements OnInit {
  timerSubscription: any;

  @Input() public options:any;
  @Input() public filter:any;
  @Input() public detailsFormat:any;

  @Input() public paginationLength: boolean;
  @Input() public columnsHide: boolean;
  @Input() public tableClass: string;
  @Input() public width: string = '100%';

  constructor(
    private _clinicService:ClinicService,
    private router: Router,
    private el: ElementRef) { }

    clinics:any;

      ngOnInit() {
        Promise.all([
          System.import('script-loader!smartadmin-plugins/datatables/datatables.min.js'),          
        ]).then(()=>{
          this.getClinics();
        })
      }
    
      getClinics(){
        this._clinicService
        .getClinics()
        .subscribe(clinics => {
          this.clinics = clinics;
      } )
      }
    
      deleteClinic(id){
          this._clinicService
            .deleteClinic(id)
            .subscribe(() => {
            this.getClinics();
          } )
      }
    
    }
    