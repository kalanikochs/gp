import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TryoutComponent } from './components/tryout/tryout.component';


const routes: Routes = [
  {
    path: '',
    component: TryoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TryoutRoutingModule { }
