import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModuleWithProviders} from "@angular/core";

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { CategoriService } from 'app/masterdata/category/category.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmartadminModule } from 'app/shared/smartadmin.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgxDatatableModule,
    SmartadminModule,
  ],
  declarations: [CategoryComponent, AddComponent, EditComponent, HomeComponent, ShowComponent],
  providers: [CategoriService],
})
export class CategoryModule { }
