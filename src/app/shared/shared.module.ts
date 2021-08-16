/* eslint-disable max-len */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDialogComponent } from './components/dialogs/basic-dialog/basic-dialog.component';
import { MaterialModule } from '../material/material.module';
import { AcceptDeclineDialogComponent } from './components/dialogs/accept-decline-dialog/accept-decline-dialog.component';
import { NotificationsDialogComponent } from './components/dialogs/notifications-dialog/notifications-dialog.component';
import { ProfileDialogComponent } from './components/dialogs/profile-dialog/profile-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanesViewDialogComponent } from './components/dialogs/planes-view-dialog/planes-view-dialog.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './translations/spanish-paginator.intl';
import { AsignarRutinaDialogComponent } from './components/dialogs/asignar-rutina-dialog/asignar-rutina-dialog.component';
import { AsignarPlanDialogComponent } from './components/dialogs/asignar-plan-dialog/asignar-plan-dialog.component';
import { ListadoRutinasComponent } from './components/rutinas/listado-rutinas/listado-rutinas.component';
import { ListadoEvidenciasComponent } from './components/evidencias/listado-evidencias/listado-evidencias.component';
import { CitasViewDialogComponent } from './components/dialogs/citas/citas-view-dialog/citas-view-dialog.component';
import { JsonParsePipe } from './pipes/json-parse.pipe';
import { RutinasViewDialogComponent } from './components/dialogs/rutinas-view-dialog/rutinas-view-dialog.component';
import { EvidenciasViewDialogComponent } from './components/dialogs/evidencias-view-dialog/evidencias-view-dialog.component';
import { EvidenciasUploadDialogComponent } from './components/dialogs/evidencias-upload-dialog/evidencias-upload-dialog.component';
import { FechaPrettyPipe } from './pipes/fecha-pretty.pipe';
import { ThereAreLinksPipe } from './pipes/there-are-links.pipe';
import { ThereAreVideosPipe } from './pipes/there-are-videos.pipe';
import { IsLinkPipe } from './pipes/is-link.pipe';
import { IsVideoPipe } from './pipes/is-video.pipe';
import { OpcionesPlanDialogComponent } from './components/dialogs/opciones-plan-dialog/opciones-plan-dialog.component';
import { CreacionDietaComponent } from './components/rutinas/creacion-dieta/creacion-dieta.component';
import { VerDietaComponent } from './components/rutinas/ver-dieta/ver-dieta.component';
import { AlimentosUploadComponent } from './components/evidencias/alimentos-upload/alimentos-upload.component';
import { AlimentosViewComponent } from './components/evidencias/alimentos-view/alimentos-view.component';
import { EvidenciasUploadMobileDialogComponent } from './components/dialogs/evidencias-upload-mobile-dialog/evidencias-upload-mobile-dialog.component';
import { SwitchAlimentosDialogComponent } from './components/dialogs/switch-alimentos-dialog/switch-alimentos-dialog.component';

@NgModule({
  declarations: [
    BasicDialogComponent,
    AcceptDeclineDialogComponent,
    NotificationsDialogComponent,
    ProfileDialogComponent,
    PlanesViewDialogComponent,
    CitasViewDialogComponent,
    AsignarRutinaDialogComponent,
    AsignarPlanDialogComponent,
    ListadoRutinasComponent,
    ListadoEvidenciasComponent,
    RutinasViewDialogComponent,
    EvidenciasViewDialogComponent,
    EvidenciasUploadDialogComponent,
    EvidenciasUploadMobileDialogComponent,
    OpcionesPlanDialogComponent,
    JsonParsePipe,
    FechaPrettyPipe,
    ThereAreLinksPipe,
    ThereAreVideosPipe,
    IsLinkPipe,
    IsVideoPipe,
    CreacionDietaComponent,
    VerDietaComponent,
    AlimentosUploadComponent,
    AlimentosViewComponent,
    SwitchAlimentosDialogComponent
  ],
  exports: [
    BasicDialogComponent,
    AcceptDeclineDialogComponent,
    PlanesViewDialogComponent,
    CitasViewDialogComponent,
    JsonParsePipe,
    FechaPrettyPipe,
    ThereAreLinksPipe,
    ThereAreVideosPipe,
    IsLinkPipe,
    IsVideoPipe
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  entryComponents: [
    BasicDialogComponent,
    AcceptDeclineDialogComponent,
    NotificationsDialogComponent,
    ProfileDialogComponent,
    PlanesViewDialogComponent,
    OpcionesPlanDialogComponent,
    CitasViewDialogComponent,
    AsignarPlanDialogComponent,
    AsignarRutinaDialogComponent,
    RutinasViewDialogComponent,
    EvidenciasViewDialogComponent,
    EvidenciasUploadDialogComponent,
    EvidenciasUploadMobileDialogComponent,
    SwitchAlimentosDialogComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
