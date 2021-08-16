import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from './services/test.service';
import { HttpRequestService } from './services/http-request.service';
import { UserloginService } from './services/userlogin.service';
import { NotificationsService } from './services/notifications.service';
import { HandsetService } from './services/handset.service';
import { UnsubscribeService } from './services/unsubscribe.service';
import { DeviceService } from './services/device.service';
import { StatusBarService } from './services/statusBar.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    TestService,
    HttpRequestService,
    UserloginService,
    NotificationsService,
    HandsetService,
    UnsubscribeService,
    DeviceService,
    StatusBarService
  ]
})
export class CoreModule {}
