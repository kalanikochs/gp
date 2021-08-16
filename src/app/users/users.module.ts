import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersHomeComponent } from './components/users-home/users-home.component';
import { UsersLayoutComponent } from './components/users-layout/users-layout.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EdLayoutComponent } from './components/ed/ed-layout/ed-layout.component';
import { NutricionLayoutComponent } from './components/nutricion/nutricion-layout/nutricion-layout.component';
import { PsicologiaLayoutComponent } from './components/psicologia/psicologia-layout/psicologia-layout.component';
import { EdHomeComponent } from './components/ed/ed-home/ed-home.component';
import { CitasOptionsDialogComponent } from './components/dialogs/citas-options-dialog/citas-options-dialog.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { PsicologiaHomeComponent } from './components/psicologia/psicologia-home/psicologia-home.component';
import { NutricionHomeComponent } from './components/nutricion/nutricion-home/nutricion-home.component';
import { ListadoCitasComponent } from './components/citas/listado-citas/listado-citas.component';
import { ListadoPlanesComponent } from './components/planes/listado-planes/listado-planes.component';
import { SolicitarCitasDialogComponent } from './components/dialogs/solicitar-citas-dialog/solicitar-citas-dialog.component';
import { MedicinaHomeComponent } from './components/medicina/medicina-home/medicina-home.component';
import { MedicinaLayoutComponent } from './components/medicina/medicina-layout/medicina-layout.component';
@NgModule({
  declarations: [
    UsersHomeComponent,
    UsersLayoutComponent,
    EdLayoutComponent,
    NutricionLayoutComponent,
    PsicologiaLayoutComponent,
    EdHomeComponent,
    NutricionHomeComponent,
    CitasOptionsDialogComponent,
    PsicologiaHomeComponent,
    ListadoCitasComponent,
    ListadoPlanesComponent,
    SolicitarCitasDialogComponent,
    MedicinaHomeComponent,
    MedicinaLayoutComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    SharedModule,
    CoreModule
  ],
  entryComponents: [CitasOptionsDialogComponent, SolicitarCitasDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {}
