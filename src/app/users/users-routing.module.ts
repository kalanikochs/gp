import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersHomeComponent } from './components/users-home/users-home.component';
import { UsersLayoutComponent } from './components/users-layout/users-layout.component';
import { EdLayoutComponent } from './components/ed/ed-layout/ed-layout.component';
import { NutricionLayoutComponent } from './components/nutricion/nutricion-layout/nutricion-layout.component';
import { PsicologiaLayoutComponent } from './components/psicologia/psicologia-layout/psicologia-layout.component';
import { EdHomeComponent } from './components/ed/ed-home/ed-home.component';
import { NutricionHomeComponent } from './components/nutricion/nutricion-home/nutricion-home.component';
import { PsicologiaHomeComponent } from './components/psicologia/psicologia-home/psicologia-home.component';
import { ListadoCitasComponent } from './components/citas/listado-citas/listado-citas.component';
import { ListadoPlanesComponent } from './components/planes/listado-planes/listado-planes.component';
import { ListadoRutinasComponent } from '../shared/components/rutinas/listado-rutinas/listado-rutinas.component';
import { ListadoEvidenciasComponent } from '../shared/components/evidencias/listado-evidencias/listado-evidencias.component';
import { MedicinaHomeComponent } from './components/medicina/medicina-home/medicina-home.component';
import { MedicinaLayoutComponent } from './components/medicina/medicina-layout/medicina-layout.component';

const routes: Routes = [
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: UsersHomeComponent
      },
      {
        path: 'medicina',
        component: MedicinaLayoutComponent,
        children: [
          {
            path: 'home',
            component: MedicinaHomeComponent
          },
          {
            path: 'citas',
            component: ListadoCitasComponent
          },
          {
            path: 'planes',
            component: ListadoPlanesComponent
          },
          {
            path: 'planes/rutinas/:planId',
            component: ListadoRutinasComponent
          },
          {
            path: 'planes/rutinas/evidencias/:rutinaId',
            component: ListadoEvidenciasComponent
          }
        ]
      },
      {
        path: 'entrenamiento-deportivo',
        component: EdLayoutComponent,
        children: [
          {
            path: 'home',
            component: EdHomeComponent
          },
          {
            path: 'citas',
            component: ListadoCitasComponent
          },
          {
            path: 'planes',
            component: ListadoPlanesComponent
          },
          {
            path: 'planes/rutinas/:planId',
            component: ListadoRutinasComponent
          },
          {
            path: 'planes/rutinas/evidencias/:rutinaId',
            component: ListadoEvidenciasComponent
          }
        ]
      },

      {
        path: 'nutricion',
        component: NutricionLayoutComponent,
        children: [
          {
            path: 'home',
            component: NutricionHomeComponent
          },
          {
            path: 'citas',
            component: ListadoCitasComponent
          },
          {
            path: 'planes',
            component: ListadoPlanesComponent
          },
          {
            path: 'planes/rutinas/:planId',
            component: ListadoRutinasComponent
          },
          {
            path: 'planes/rutinas/evidencias/:rutinaId',
            component: ListadoEvidenciasComponent
          }
        ]
      },
      {
        path: 'psicologia',
        component: PsicologiaLayoutComponent,
        children: [
          {
            path: 'home',
            component: PsicologiaHomeComponent
          },
          {
            path: 'citas',
            component: ListadoCitasComponent
          },
          {
            path: 'planes',
            component: ListadoPlanesComponent
          },
          {
            path: 'planes/rutinas/:planId',
            component: ListadoRutinasComponent
          },
          {
            path: 'planes/rutinas/evidencias/:rutinaId',
            component: ListadoEvidenciasComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
