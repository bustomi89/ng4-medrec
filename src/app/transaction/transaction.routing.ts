import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'registration', pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren:'./registration/registration.module#RegistrationModule',
  }
];

export const routing = RouterModule.forChild(routes);
