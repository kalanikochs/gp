/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Evidencia } from 'src/app/core/interfaces/evidencia.module';
import { ActivatedRoute } from '@angular/router';
import { Rutina } from 'src/app/core/interfaces/rutina.module';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { Plan } from 'src/app/core/interfaces/plan.module';
//import { EvidenciasViewDialogComponent } from '../../dialogs/evidencias-view-dialog/evidencias-view-dialog.component';
//import { EvidenciasUploadDialogComponent } from '../../dialogs/evidencias-upload-dialog/evidencias-upload-dialog.component';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { DeviceService } from 'src/app/core/services/device.service';
//import { EvidenciasUploadMobileDialogComponent } from '../../dialogs/evidencias-upload-mobile-dialog/evidencias-upload-mobile-dialog.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
