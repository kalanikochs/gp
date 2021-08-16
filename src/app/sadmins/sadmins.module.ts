import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SadminsLayoutComponent } from './components/sadmins-layout/sadmins-layout.component';
import { SadminsHomeComponent } from './components/sadmins-home/sadmins-home.component';
import { SadminsRoutingModule } from './sadmins-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [SadminsLayoutComponent, SadminsHomeComponent],
  imports: [
    CommonModule, SadminsRoutingModule, MaterialModule
  ]
})
export class SadminsModule { }
