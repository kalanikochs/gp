import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogComponent } from './components/dialogFiles/dialog/dialog.component';
import { ServiceGetComponent } from './components/testService/service-get/service-get.component';
import { ServiceSetComponent } from './components/testService/service-set/service-set.component';
import { TestHomeComponent } from './components/test-home/test-home.component';
import { ValueBindingComponent } from './components/value-binding/value-binding.component';
import { GetRequestComponent } from './components/httprequest/get-request/get-request.component';
import { PostRequestComponent } from './components/httprequest/post-request/post-request.component';
import { ObservableComponent } from './components/observable/observable/observable.component';
import { SelectComponent } from './components/select/select/select.component';
import { Sub1Component } from './components/subscriptions/sub1/sub1.component';
import { Sub2Component } from './components/subscriptions/sub2/sub2.component';
import { FullTableComponent } from './components/full-table/full-table.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { DialogInsideComponent } from './components/dialog-inside/dialog-inside.component';
import { PlatformComponent } from './components/platform/platform.component';
import { StatusbarComponent } from './components/statusbar/statusbar.component';

const routes: Routes = [
  {
    path: '',
    component: TestHomeComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'serviceget',
    component: ServiceGetComponent
  },
  {
    path: 'serviceset',
    component: ServiceSetComponent
  },
  {
    path: 'valuebinding',
    component: ValueBindingComponent
  },
  {
    path: 'getrequest',
    component: GetRequestComponent
  },
  {
    path: 'postrequest',
    component: PostRequestComponent
  },
  {
    path: 'observable',
    component: ObservableComponent
  },
  {
    path: 'select',
    component: SelectComponent
  },
  {
    path: 'sub1',
    component: Sub1Component
  },
  {
    path: 'sub2',
    component: Sub2Component
  },
  {
    path: 'full-table',
    component: FullTableComponent
  },
  {
    path: 'file-upload',
    component: FileUploadComponent
  },
  {
    path: 'tabla',
    component: TablaComponent
  },
  {
    path: 'pruebas',
    component: PruebasComponent
  },
  {
    path: 'dialog-inside',
    component: DialogInsideComponent
  },
  {
    path: 'platform',
    component: PlatformComponent
  },
  {
    path: 'statusBar',
    component: StatusbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {}
