import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsHomeComponent } from './components/admins-home/admins-home.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { MaterialModule } from '../material/material.module';
import { AdminsLayoutComponent } from './components/admins-layout/admins-layout.component';
import { CitasHomeComponent } from './components/citas/citas-home/citas-home.component';
import { CitasPendientesComponent } from './components/citas/citas-pendientes/citas-pendientes.component';
import { CitasLayoutComponent } from './components/citas/citas-layout/citas-layout.component';
import { PlanesLayoutComponent } from './components/planes/planes-layout/planes-layout.component';
import { PlanesPendientesComponent } from './components/planes/planes-pendientes/planes-pendientes.component';
import { PlanesHomeComponent } from './components/planes/planes-home/planes-home.component';
import { ListadoProfesionalesComponent } from './components/profesionales/listado-profesionales/listado-profesionales.component';
import { ListadoUsuariosComponent } from './components/usuarios/listado-usuarios/listado-usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OpcionesCitaDialogComponent } from './components/dialogs/opciones-cita-dialog/opciones-cita-dialog.component';
import { OpcionesPersonaDialogComponent } from './components/dialogs/opciones-persona-dialog/opciones-persona-dialog.component';
import { AgregarPersonaDialogComponent } from './components/dialogs/agregar-persona-dialog/agregar-persona-dialog.component';
import { VerPersonaDialogComponent } from './components/dialogs/ver-persona-dialog/ver-persona-dialog.component';
import { ModificarFechaCitaDialogComponent } from './components/dialogs/modificar-fecha-cita-dialog/modificar-fecha-cita-dialog.component';

@NgModule({
  declarations: [
    AdminsHomeComponent,
    AdminsLayoutComponent,
    CitasHomeComponent,
    CitasPendientesComponent,
    CitasLayoutComponent,
    PlanesLayoutComponent,
    PlanesPendientesComponent,
    PlanesHomeComponent,
    ListadoProfesionalesComponent,
    ListadoUsuariosComponent,
    OpcionesCitaDialogComponent,
    OpcionesPersonaDialogComponent,
    AgregarPersonaDialogComponent,
    VerPersonaDialogComponent,
    ModificarFechaCitaDialogComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    OpcionesCitaDialogComponent,
    OpcionesPersonaDialogComponent,
    AgregarPersonaDialogComponent,
    VerPersonaDialogComponent,
    ModificarFechaCitaDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminsModule {}
