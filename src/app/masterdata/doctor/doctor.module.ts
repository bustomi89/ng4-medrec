import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModuleWithProviders} from "@angular/core";

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { DoctorService } from 'app/masterdata/doctor/doctor.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmartadminModule } from 'app/shared/smartadmin.module';

@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NgxDatatableModule,
    SmartadminModule,
  ],
  declarations: [DoctorComponent, AddComponent, EditComponent, HomeComponent, ShowComponent],
  providers: [DoctorService],
})
export class DoctorModule { }
