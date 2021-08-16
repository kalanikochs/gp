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
import { AgregarAlimentoDialogComponent } from './components/dialogs/agregar-alimento-dialog/agregar-alimento-dialog.component';
import { ModificarAlimentoDialogComponent } from './components/dialogs/modificar-alimento-dialog/modificar-alimento-dialog.component';

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
    AgregarAlimentoDialogComponent,
    ModificarAlimentoDialogComponent
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
    ModificarAlimentoDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfsModule {}
