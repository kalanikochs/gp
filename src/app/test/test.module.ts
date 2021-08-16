import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './components/dialogFiles/dialog/dialog.component';
import { AlertComponent } from './components/dialogFiles/alert/alert.component';
import { Alert2Component } from './components/dialogFiles/alert2/alert2.component';
import { Dialog3Component } from './components/dialogFiles/dialog3/dialog3.component';
import { SharedModule } from '../shared/shared.module';
import { ServiceSetComponent } from './components/testService/service-set/service-set.component';
import { ServiceGetComponent } from './components/testService/service-get/service-get.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetRequestComponent } from './components/httprequest/get-request/get-request.component';
import { ValueBindingComponent } from './components/value-binding/value-binding.component';
import { TestHomeComponent } from './components/test-home/test-home.component';
import { PostRequestComponent } from './components/httprequest/post-request/post-request.component';
import { ObservableComponent } from './components/observable/observable/observable.component';
import { SelectComponent } from './components/select/select/select.component';
import { Sub1Component } from './components/subscriptions/sub1/sub1.component';
import { Sub2Component } from './components/subscriptions/sub2/sub2.component';
import { CoreModule } from '../core/core.module';
import { FullTableComponent } from './components/full-table/full-table.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { TablaComponent } from './components/tabla/tabla.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { TestDialog1Component } from './dialogs/test-dialog1/test-dialog1.component';
import { DialogInsideComponent } from './components/dialog-inside/dialog-inside.component';
import { DialogInsideInsideComponent } from './components/dialog-inside-inside/dialog-inside-inside.component';
@NgModule({
  declarations: [
    TestHomeComponent,
    DialogComponent,
    AlertComponent,
    Alert2Component,
    Dialog3Component,
    ServiceSetComponent,
    ServiceGetComponent,
    GetRequestComponent,
    ValueBindingComponent,
    PostRequestComponent,
    ObservableComponent,
    SelectComponent,
    Sub1Component,
    Sub2Component,
    FullTableComponent,
    FileUploadComponent,
    TablaComponent,
    PruebasComponent,
    TestDialog1Component,
    DialogInsideComponent,
    DialogInsideInsideComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialFileInputModule
  ],
  entryComponents: [Alert2Component, Dialog3Component, TestDialog1Component],
  bootstrap: [AlertComponent]
})
export class TestModule {}
