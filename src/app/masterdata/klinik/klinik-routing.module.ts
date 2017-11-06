import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KlinikComponent } from 'app/masterdata/klinik/klinik.component';
import { HomeComponent } from 'app/masterdata/klinik/home/home.component';
import { AddComponent } from 'app/masterdata/klinik/add/add.component';
import { EditComponent } from 'app/masterdata/klinik/edit/edit.component';
import { ShowComponent } from 'app/masterdata/klinik/show/show.component';


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
export class KlinikRoutingModule { }
