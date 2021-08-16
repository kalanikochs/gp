/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CitasOptionsDialogComponent } from 'src/app/users/components/dialogs/citas-options-dialog/citas-options-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from 'src/app/core/interfaces/cita.module';
import { UserLogged } from 'src/app/core/interfaces/userLogged.module';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { CitasViewDialogComponent } from 'src/app/shared/components/dialogs/citas/citas-view-dialog/citas-view-dialog.component';
import { SolicitarCitasDialogComponent } from '../../dialogs/solicitar-citas-dialog/solicitar-citas-dialog.component';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.scss']
})
export class ListadoCitasComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isHandsetValue: boolean;
  mobile: boolean;
  small: boolean;

  private userLogged$: UserLogged;
  private listadoCitas: Cita[] = [];
  private subscriptions = [];
  private tipoProceso$: number;

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private userLogged: UserloginService,
    private httpRequest: HttpRequestService,
    private deviceService: DeviceService
  ) {
    this.mobile = this.deviceService.mobile;
    this.small = this.deviceService.small;
    this.displayedColumns = this.small
      ? ['fecha','estado', 'opciones']
      : ['fecha', 'hora', 'estado', 'tipo', 'opciones'];
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // ============================

  async init() {
    await this.asignarHandsetValue();
    await this.verifyUserLogged();
    await this.tipoProceso();

    this.mostrarCitas();
  }

  private asignarHandsetValue() {
    return new Promise(resolve => {
      const subscription = this.isHandset$.subscribe(value => {
        this.isHandsetValue = value;
        resolve(true);
      });
      this.subscriptions.push(subscription);
    });
  }

  private verifyUserLogged() {
    return new Promise(resolve => {
      this.userLogged.verifyUserLogged().then(result => {
        if (result) {
          const subc = this.userLogged.userLoggedObs$.subscribe(userInfo => {
            this.userLogged$ = userInfo;
            resolve(true);
          });
          this.subscriptions.push(subc);
        }
      });
    });
  }

  private tipoProceso() {
    return new Promise(resolve => {
      const subc = this.userLogged.tipoProceso$.subscribe(tipo => {
        this.tipoProceso$ = tipo;
        resolve(true);
      });
      this.subscriptions.push(subc);
    });
  }

  private mostrarCitas() {
    const personType = this.userLogged$.type;

    const data = new FormData();

    const url = environment.apiUrl + '/Users/Citas/mostrarCitas/';
    data.append('usuario_id', (this.userLogged$.id as unknown) as string);
    data.append('tipo_id', (this.tipoProceso$ as unknown) as string);

    this.httpRequest
      .postRequest(url, data)
      .pipe(
        map(response => {
          if (response.status === 'success') {
            return response.message as Cita[];
          } else {
            console.log('Problema mostrar usuarios - Users');
            return [];
          }
        })
      )
      .subscribe(response => {
        this.listadoCitas = response;
        this.dataSource.data = this.listadoCitas;
      });
  }

  // =============================

  public solicitarCita() {
    const solicitarCita = this.dialog.open(SolicitarCitasDialogComponent, {
      width: this.isHandsetValue ? '90%' : '700px',
      data: { tipoProceso: this.tipoProceso$, usuario_id: this.userLogged$.id }
    });

    solicitarCita.afterClosed().subscribe(formd => {
      if (formd) {
        const urlToSend = environment.apiUrl + '/Users/Citas/solicitarCita/';
        const dataTosend = formd;

        this.httpRequest
          .postRequest(urlToSend, dataTosend)
          .pipe(map(result => result as MessageRequest))
          .subscribe(response => {
            if (response.status === 'success') {
              alert('Cita solicitada con éxito');
              this.mostrarCitas();
            } else {
              console.log(response.message);
            }
          });
      }
    });
  }

  public showCitaOptions(id: any) {
    const cita_estado_id = this.listadoCitas.find(cita => cita.cita_id === id)
      .cita_estado_id;

    const citasOptions = this.dialog.open(CitasOptionsDialogComponent, {
      width: this.isHandsetValue ? '90%' : '500px',
      data: { cita_id: `${id}`, cita_estado_id: `${cita_estado_id}` }
    });

    citasOptions.afterClosed().subscribe(res => {
      if (res) {
        let url = '';
        const data = new FormData();

        data.append('cita_id', id);

        switch (res.option) {
          case 'anular':
            url = environment.apiUrl + '/Users/Citas/anularCita/';
            break;

          case 'confirmar':
            url = environment.apiUrl + '/Users/Citas/confirmarCita/';
            break;

          default:
            break;
        }

        this.httpRequest
          .postRequest(url, data)
          .pipe(map(result => result as MessageRequest))
          .subscribe(response => {
            if (response.status === 'success') {
              this.mostrarCitas();
            } else {
              console.log(`${response.status}: ${response.message}`);
            }
          });
      }
    });
  }

  public showCita(id: any) {
    const citaToShow = this.listadoCitas.find(
      eachCita => eachCita.cita_id === id
    );

    this.dialog.open(CitasViewDialogComponent, {
      width: '90%',
      data: { cita: citaToShow }
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
