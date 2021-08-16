import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoEvidenciasComponent } from '../shared/components/evidencias/listado-evidencias/listado-evidencias.component';
import { ListadoRutinasComponent } from '../shared/components/rutinas/listado-rutinas/listado-rutinas.component';
import { AdminsHomeComponent } from './components/admins-home/admins-home.component';
import { AdminsLayoutComponent } from './components/admins-layout/admins-layout.component';
import { CitasLayoutComponent } from './components/citas/citas-layout/citas-layout.component';
import { CitasPendientesComponent } from './components/citas/citas-pendientes/citas-pendientes.component';
import { PlanesLayoutComponent } from './components/planes/planes-layout/planes-layout.component';
import { PlanesPendientesComponent } from './components/planes/planes-pendientes/planes-pendientes.component';
import { ListadoProfesionalesComponent } from './components/profesionales/listado-profesionales/listado-profesionales.component';
import { ListadoUsuariosComponent } from './components/usuarios/listado-usuarios/listado-usuarios.component';


const routes: Routes = [
  {
    path: '',
    component: AdminsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: AdminsHomeComponent
      },
      {
        path: 'citas',
        component: CitasPendientesComponent
      },
      {
        path: 'planes',
        component: PlanesPendientesComponent
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
        path: 'profesionales',
        component: ListadoProfesionalesComponent
      },
      {
        path: 'usuarios',
        component: ListadoUsuariosComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule {}
