import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TryoutRoutingModule } from './tryout-routing.module';
import { TryoutComponent } from './components/tryout/tryout.component';


@NgModule({
  declarations: [TryoutComponent],
  imports: [
    CommonModule,
    TryoutRoutingModule
  ]
})
export class TryoutModule { }
