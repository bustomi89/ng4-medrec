import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'clinic', pathMatch: 'full'
  },
  // {
  //   path: 'clinic',
  //   loadChildren:'./clinic/clinic.module#ClinicModule',
  // },
  {
    path: 'klinik',
    loadChildren:'./klinik/klinik.module#KlinikModule',
  }, 
  {
    path: 'category',
    loadChildren:'./category/category.module#CategoryModule',
  },
  // {
  //   path: 'kategori',
  //   loadChildren:'./kategori/kategori.module#KategoriModule',
     
  // }
   //,
  {
    path: 'doctor',
    loadChildren:'./doctor/doctor.module#DoctorModule',
     
  },
  {
    path: 'customer',
    loadChildren:'./customer/customer.module#CustomerModule',
     
  },
  {
    path: 'pet',
    loadChildren:'./pet/pet.module#PetModule',
  }
];

export const routing = RouterModule.forChild(routes);
