import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModuleWithProviders} from "@angular/core";

import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicComponent } from './clinic.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { ClinicService } from 'app/masterdata/clinic/clinic.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmartadminModule } from 'app/shared/smartadmin.module';

@NgModule({
  imports: [
    CommonModule,
    ClinicRoutingModule,
    NgxDatatableModule,
    SmartadminModule,
  ],
  declarations: [ClinicComponent, AddComponent, EditComponent, HomeComponent, ShowComponent],
  providers: [ClinicService],
})
export class ClinicModule { }
