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
import { ConfigurarSwitchPsicologiaComponent } from './components/switch-psicologia/configurar-switch-psicologia/configurar-switch-psicologia.component';
import { SwitchPsicologiaLayoutComponent } from './components/switch-psicologia/switch-psicologia-layout/switch-psicologia-layout.component';
import { AgregarPsicologiaDialogComponent } from './components/dialogs/agregar-psicologia-dialog/agregar-psicologia-dialog.component';
import { ModificarPsicologiaDialogComponent } from './components/dialogs/modificar-psicologia-dialog/modificar-psicologia-dialog.component';
import { ConfigurarGrupoPsicologiaComponent } from './components/switch-psicologia/configurar-grupo-psicologia/configurar-grupo-psicologia.component';
import { SwitchMedicoLayoutComponent } from './components/switch-medico/switch-medico-layout/switch-medico-layout.component';
import { ConfigurarSwitchMedicoComponent } from './components/switch-medico/configurar-switch-medico/configurar-switch-medico.component';
import { ConfigurarGrupoMedicoComponent } from './components/switch-medico/configurar-grupo-medico/configurar-grupo-medico.component';
import { AgregarMedicinaDialogComponent } from './components/dialogs/agregar-medicina-dialog/agregar-medicina-dialog.component';
import { ModificarMedicinaDialogComponent } from './components/dialogs/modificar-medicina-dialog/modificar-medicina-dialog.component';

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
    ConfigurarSwitchPsicologiaComponent,
    ConfigurarGrupoPsicologiaComponent,
    SwitchPsicologiaLayoutComponent,
    ConfigurarSwitchMedicoComponent,
    ConfigurarGrupoMedicoComponent,
    SwitchMedicoLayoutComponent,
    AgregarAlimentoDialogComponent,
    AgregarEjercicioDialogComponent,
    AgregarPsicologiaDialogComponent,
    AgregarMedicinaDialogComponent,
    ModificarAlimentoDialogComponent,
    ModificarEjercicioDialogComponent,
    ModificarPsicologiaDialogComponent,
    ModificarMedicinaDialogComponent,
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
    AgregarPsicologiaDialogComponent,
    AgregarMedicinaDialogComponent,
    ModificarAlimentoDialogComponent,
    ModificarEjercicioDialogComponent,
    ModificarPsicologiaDialogComponent,
    ModificarMedicinaDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfsModule {}
