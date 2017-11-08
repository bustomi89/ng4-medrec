import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/masterdata/clinic/home/home.component';
import { AddComponent } from 'app/masterdata/clinic/add/add.component';
import { EditComponent } from 'app/masterdata/clinic/edit/edit.component';
import { ShowComponent } from 'app/masterdata/clinic/show/show.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"add", component:AddComponent},
  {path:"edit/:id", component:EditComponent},
  {path:"show/:id", component:ShowComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
