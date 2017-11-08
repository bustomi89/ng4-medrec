import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetRoutingModule } from './pet-routing.module';
import { PetComponent } from './pet.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { PetService } from 'app/masterdata/pet/pet.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmartadminModule } from 'app/shared/smartadmin.module';


@NgModule({
  imports: [
    CommonModule,
    PetRoutingModule,
    NgxDatatableModule,
    SmartadminModule,
  ],
  declarations: [PetComponent, AddComponent, EditComponent, HomeComponent, ShowComponent],
  providers: [PetService],
})
export class PetModule { }
