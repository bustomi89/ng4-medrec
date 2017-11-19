import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModuleWithProviders} from "@angular/core";

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmartadminModule } from 'app/shared/smartadmin.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';
import { PetService } from 'app/transaction/registration/pet.service';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    NgxDatatableModule,
    SmartadminModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [RegistrationComponent, AddComponent, EditComponent, HomeComponent, ShowComponent],
  providers: [RegistrationService,PetService],
})
export class RegistrationModule { }
