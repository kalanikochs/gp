import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfsHomeComponent } from './components/profs-home/profs-home.component';
import { ProfsLayoutComponent } from './components/profs-layout/profs-layout.component';
import { CitasLayoutComponent } from './components/citas/citas-layout/citas-layout.component';
import { PlanesLayoutComponent } from './components/planes/planes-layout/planes-layout.component';
import { ListadoRutinasComponent } from '../shared/components/rutinas/listado-rutinas/listado-rutinas.component';
import { ListadoEvidenciasComponent } from '../shared/components/evidencias/listado-evidencias/listado-evidencias.component';
import { SwitchAlimentarioLayoutComponent } from './components/switch-alimentario/switch-alimentario-layout/switch-alimentario-layout.component';
import { SwitchDeportivoLayoutComponent } from './components/switch-deportivo/switch-deportivo-layout/switch-deportivo-layout.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SwitchPsicologiaLayoutComponent } from './components/switch-psicologia/switch-psicologia-layout/switch-psicologia-layout.component';
import { SwitchMedicoLayoutComponent } from './components/switch-medico/switch-medico-layout/switch-medico-layout.component';

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
      {
        path: 'switchdeportivo',
        component: SwitchDeportivoLayoutComponent
      },
      {
        path: 'switchpsicologia',
        component: SwitchPsicologiaLayoutComponent
      },
      {
        path: 'switchmedico',
        component: SwitchMedicoLayoutComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfsRoutingModule {}
