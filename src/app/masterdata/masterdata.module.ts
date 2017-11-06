import {SmartadminModule} from '../shared/smartadmin.module';
import { NgModule } from '@angular/core';

import {routing} from './masterdata.routing';
import { DoctorComponent } from './doctor/doctor.component';
import { AddComponent } from './doctor/add/add.component';
import { EditComponent } from './doctor/edit/edit.component';
import { HomeComponent } from './doctor/home/home.component';
import { ShowComponent } from './doctor/show/show.component';

@NgModule({
  imports: [
    SmartadminModule,
    routing,
  ],
  declarations: [DoctorComponent, AddComponent, EditComponent, HomeComponent, ShowComponent]
})
export class MasterdataModule { }
