import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModuleWithProviders} from "@angular/core";

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { CustomerService } from 'app/masterdata/customer/customer.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmartadminModule } from 'app/shared/smartadmin.module';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgxDatatableModule,
    SmartadminModule,
  ],
  declarations: [CustomerComponent, AddComponent, EditComponent, HomeComponent, ShowComponent],
  providers: [CustomerService],
})
export class CustomerModule { }
