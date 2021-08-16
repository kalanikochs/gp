import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SadminsHomeComponent } from './components/sadmins-home/sadmins-home.component';

const routes: Routes = [
  {
    path: '',
    component: SadminsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SadminsRoutingModule {}
