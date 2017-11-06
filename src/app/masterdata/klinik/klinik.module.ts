import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KlinikRoutingModule } from './klinik-routing.module';
import { KlinikComponent } from './klinik.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { ClinicService } from 'app/masterdata/klinik/klinik.service';
import { SmartadminDatatableModule } from 'app/shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminModule } from 'app/shared/smartadmin.module';

@NgModule({
  imports: [
    CommonModule,
    KlinikRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule
  ],
  declarations: [KlinikComponent, AddComponent, EditComponent, HomeComponent, ShowComponent],
  providers: [ClinicService],
})
export class KlinikModule { }
