import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfsHomeComponent } from './components/profs-home/profs-home.component';
import { ProfsLayoutComponent } from './components/profs-layout/profs-layout.component';
import { CitasLayoutComponent } from './components/citas/citas-layout/citas-layout.component';
import { PlanesLayoutComponent } from './components/planes/planes-layout/planes-layout.component';
import { ListadoRutinasComponent } from '../shared/components/rutinas/listado-rutinas/listado-rutinas.component';
import { ListadoEvidenciasComponent } from '../shared/components/evidencias/listado-evidencias/listado-evidencias.component';
import { SwitchAlimentarioLayoutComponent } from './components/switch-alimentario/switch-alimentario-layout/switch-alimentario-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ProfsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: ProfsHomeComponent
      },
      {
        path: 'citas',
        component: CitasLayoutComponent
      },
      {
        path: 'planes',
        component: PlanesLayoutComponent
      },
      {
        path: 'planes/rutinas/:planId',
        component: ListadoRutinasComponent
      },
      {
        path: 'planes/rutinas/evidencias/:rutinaId',
        component: ListadoEvidenciasComponent
      },
      {
        path: 'switchalimentario',
        component: SwitchAlimentarioLayoutComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfsRoutingModule {}
