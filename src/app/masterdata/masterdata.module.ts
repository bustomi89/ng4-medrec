import {SmartadminModule} from '../shared/smartadmin.module';
import { NgModule } from '@angular/core';
import {routing} from './masterdata.routing';

@NgModule({
  imports: [
    SmartadminModule,
    routing,
  ]
})
export class MasterdataModule { }
