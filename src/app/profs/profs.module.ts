import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfsLayoutComponent } from './components/profs-layout/profs-layout.component';
import { ProfsHomeComponent } from './components/profs-home/profs-home.component';
import { ProfsRoutingModule } from './profs-routing.module';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CitasHomeComponent } from './components/citas/citas-home/citas-home.component';
import { CitasLayoutComponent } from './components/citas/citas-layout/citas-layout.component';
import { PlanesLayoutComponent } from './components/planes/planes-layout/planes-layout.component';
import { PlanesHomeComponent } from './components/planes/planes-home/planes-home.component';
import { ListadoCitasComponent } from './components/citas/listado-citas/listado-citas.component';
import { SolicitarCitasDialogComponent } from './components/dialogs/solicitar-citas-dialog/solicitar-citas-dialog.component';
import { CitasOptionsDialogComponent } from './components/dialogs/citas-options-dialog/citas-options-dialog.component';
import { ResultadoCitaDialogComponent } from './components/dialogs/resultado-cita-dialog/resultado-cita-dialog.component';
import { ListadoPlanesComponent } from './components/planes/listado-planes/listado-planes.component';
import { ConfigurarSwitchAlimentarioComponent } from './components/switch-alimentario/configurar-switch-alimentario/configurar-switch-alimentario.component';
import { SwitchAlimentarioLayoutComponent } from './components/switch-alimentario/switch-alimentario-layout/switch-alimentario-layout.component';
import { ConfigurarSwitchDeportivoComponent } from './components/switch-deportivo/configurar-switch-deportivo/configurar-switch-deportivo.component';
import { ConfigurarGrupoMuscularComponent } from './components/switch-deportivo/configurar-grupo-muscular/configurar-grupo-muscular.component';
import { SwitchDeportivoLayoutComponent } from './components/switch-deportivo/switch-deportivo-layout/switch-deportivo-layout.component';
import { AgregarAlimentoDialogComponent } from './components/dialogs/agregar-alimento-dialog/agregar-alimento-dialog.component';
import { AgregarEjercicioDialogComponent } from './components/dialogs/agregar-ejercicio-dialog/agregar-ejercicio-dialog.component';
import { ModificarAlimentoDialogComponent } from './components/dialogs/modificar-alimento-dialog/modificar-alimento-dialog.component';
import { ModificarEjercicioDialogComponent } from './components/dialogs/modificar-ejercicio-dialog/modificar-ejercicio-dialog.component';
import { MessagesComponent } from './components/messages/messages.component';
@NgModule({
  declarations: [
    ProfsLayoutComponent,
    ProfsHomeComponent,
    CitasHomeComponent,
    CitasLayoutComponent,
    PlanesLayoutComponent,
    PlanesHomeComponent,
    ListadoCitasComponent,
    SolicitarCitasDialogComponent,
    CitasOptionsDialogComponent,
    ResultadoCitaDialogComponent,
    ListadoPlanesComponent,
    ConfigurarSwitchAlimentarioComponent,
    SwitchAlimentarioLayoutComponent,
    ConfigurarSwitchDeportivoComponent,
    ConfigurarGrupoMuscularComponent,
    SwitchDeportivoLayoutComponent,
    AgregarAlimentoDialogComponent,
    AgregarEjercicioDialogComponent,
    ModificarAlimentoDialogComponent,
    ModificarEjercicioDialogComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    ProfsRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SolicitarCitasDialogComponent,
    CitasOptionsDialogComponent,
    ResultadoCitaDialogComponent,
    AgregarAlimentoDialogComponent,
    AgregarEjercicioDialogComponent,
    ModificarAlimentoDialogComponent,
    ModificarEjercicioDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfsModule {}
