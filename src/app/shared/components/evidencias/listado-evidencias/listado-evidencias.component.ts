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
import { EvidenciasViewDialogComponent } from '../../dialogs/evidencias-view-dialog/evidencias-view-dialog.component';
import { EvidenciasUploadDialogComponent } from '../../dialogs/evidencias-upload-dialog/evidencias-upload-dialog.component';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { EvidenciasUploadMobileDialogComponent } from '../../dialogs/evidencias-upload-mobile-dialog/evidencias-upload-mobile-dialog.component';
@Component({
  selector: 'app-listado-evidencias',
  templateUrl: './listado-evidencias.component.html',
  styleUrls: ['./listado-evidencias.component.scss']
})
export class ListadoEvidenciasComponent
  implements OnInit, OnDestroy, AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isHandsetValue: boolean;
  subscriptions = [];
  rutinaId: number;
  rutinaInfo: Rutina;
  planActual: Plan;
  listadoEvidencias: Evidencia[];
  userLogged$;

  displayedColumns: string[] = ['fecha', 'opciones'];
  dataSource = new MatTableDataSource();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private httpRequest: HttpRequestService,
    private userLogged: UserloginService,
    private deviceService: DeviceService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  // ================================

  async init() {
    await this.verifyLogin();
    await this.assingHandsetValue();
    await this.traerRutinaId();
    await this.traerInfoRutina();
    await this.traerPlanActual();
    this.traerEvidencias();
  }

  private verifyLogin() {
    return new Promise(resolve => {
      const subscription2 = this.userLogged.userLoggedObs$.subscribe(
        userInfo => {
          this.userLogged$ = userInfo;
          resolve(true);
        }
      );
      this.subscriptions.push(subscription2);
    });
  }

  private assingHandsetValue() {
    return new Promise(resolve => {
      const obs1 = this.isHandset$.subscribe(value => {
        this.isHandsetValue = value;
        resolve(true);
      });
      this.subscriptions.push(obs1);
    });
  }

  private traerRutinaId() {
    return new Promise(resolve => {
      this.activatedRoute.params.subscribe(param => {
        this.rutinaId = param.rutinaId;
        resolve(true);
      });
    });
  }

  private traerInfoRutina() {
    return new Promise(resolve => {
      const url = environment.apiUrl + '/shared/rutinas/mostrarRutinaActual/';
      const data = new FormData();
      data.append('rutina_id', this.rutinaId.toString());

      this.httpRequest
        .postRequest(url, data)
        .pipe(map(result => result as MessageRequest))
        .subscribe(response => {
          if (response.status === 'success') {
            this.rutinaInfo = response.message as Rutina;
            resolve(true);
          } else {
            console.log(`${response.status}: ${response.message}`);
          }
        });
    });
  }

  private traerEvidencias() {
    return new Promise(resolve => {
      const url = environment.apiUrl + '/shared/evidencias/mostrarEvidencias/';
      const data = new FormData();
      data.append('rutina_id', this.rutinaId.toString());

      this.httpRequest
        .postRequest(url, data)
        .pipe(map(result => result as MessageRequest))
        .subscribe(response => {
          if (response.status === 'success') {
            this.listadoEvidencias = response.message as Evidencia[];
            this.dataSource.data = this.listadoEvidencias;
            resolve(true);
          } else {
            console.log(`${response.status}: ${response.message}`);
          }
        });
    });
  }

  private traerPlanActual() {
    return new Promise(resolve => {
      const url = environment.apiUrl + '/shared/planes/mostrarPlanActual/';
      const data = new FormData();
      data.append('plan_id', this.rutinaInfo.rutina_plan_id);

      this.httpRequest
        .postRequest(url, data)
        .pipe(map(result => result as MessageRequest))
        .subscribe(response => {
          if (response.status === 'success') {
            this.planActual = response.message;
            resolve(true);
          } else {
            console.log(`${response.status}: ${response.message}`);
          }
        });
    });
  }

  // ===============================

  verEvidencia(index: any) {
    const evidencia = this.listadoEvidencias.find(
      evd => evd.evidencia_id === index
    );

    this.dialog.open(EvidenciasViewDialogComponent, {
      data: { evidencia, planActual: this.planActual },
      width: this.isHandsetValue ? '90%' : '600px'
    });
  }

  agregarEvidencia() {
    let evidenciasUploadDialog;

    if (this.deviceService.mobile) {
      evidenciasUploadDialog = EvidenciasUploadMobileDialogComponent;
    } else {
      evidenciasUploadDialog = EvidenciasUploadDialogComponent;
    }

    const thisDialog = this.dialog.open(evidenciasUploadDialog, {
      autoFocus: false,
      data: { planActual: this.planActual }
    });

    thisDialog.afterClosed().subscribe(data => {
      if (data) {
        data.append('rutina_id', this.rutinaId.toString());

        let url: string;

        if (this.deviceService.mobile) {
          url =
            environment.apiUrl + '/shared/evidencias/agregarEvidenciaMobile/';
        } else {
          url = environment.apiUrl + '/shared/evidencias/agregarEvidencia/';
        }

        this.httpRequest
          .postRequest(url, data)
          .pipe(map(result => result as MessageRequest))
          .subscribe(response => {
            if (response.status === 'success') {
              this.traerEvidencias();
            } else {
              console.log(`${response.status}: ${response.message}`);
            }
          });
      }
    });
  }
}
