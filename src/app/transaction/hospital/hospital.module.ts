import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalRoutingModule } from 'app/transaction/hospital/hospital-routing.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmartadminModule } from 'app/shared/smartadmin.module';
import { TypeaheadModule } from 'ngx-bootstrap';
import { HospitalComponent } from 'app/transaction/hospital/hospital.component';
import { AddComponent } from 'app/transaction/hospital/add/add.component';
import { EditComponent } from 'app/transaction/hospital/edit/edit.component';
import { HomeComponent } from 'app/transaction/hospital/home/home.component';
import { ShowComponent } from 'app/transaction/hospital/show/show.component';
import { HospitalService } from 'app/transaction/hospital/hospital.service';

@NgModule({
  imports: [
    CommonModule,
    HospitalRoutingModule,
    NgxDatatableModule,
    SmartadminModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [HospitalComponent, AddComponent, EditComponent, HomeComponent, ShowComponent],
  providers: [HospitalService]
})
export class HospitalModule { }
