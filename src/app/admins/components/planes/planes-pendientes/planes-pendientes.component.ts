import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Observable, Unsubscribable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PlanesViewDialogComponent } from 'src/app/shared/components/dialogs/planes-view-dialog/planes-view-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { Plan } from 'src/app/core/interfaces/plan.module';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { OpcionesPlanDialogComponent } from 'src/app/shared/components/dialogs/opciones-plan-dialog/opciones-plan-dialog.component';

@Component({
  selector: 'app-planes-pendientes',
  templateUrl: './planes-pendientes.component.html',
  styles: []
})
export class PlanesPendientesComponent
  implements OnInit, OnDestroy, AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isHandsetValue: boolean;
  subscriptions = [];
  displayedColumns: string[] = [
    'tipo',
    'nombre',
    'paciente',
    'profesional',
    'estado',
    'opciones'
  ];
  dataSource = new MatTableDataSource();
  listadoPlanes: Plan[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private httpRequest: HttpRequestService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      el.unsubscribe();
    });
  }

  // ============================

  async init() {
    await this.handsetSubscribre();
    this.mostrarPlanes();
  }

  private mostrarPlanes() {
    const data = new FormData();

    const url = environment.apiUrl + '/Admins/Planes/mostrarPlanes/';

    this.httpRequest
      .postRequest(url, data)
      .pipe(
        map(response => {
          if (response.status === 'success') {
            return response.message as Plan[];
          } else {
            console.log(response.message);
            return [];
          }
        })
      )
      .subscribe(response => {
        this.listadoPlanes = response;
        this.dataSource.data = this.listadoPlanes;
      });
  }

  private handsetSubscribre() {
    return new Promise(resolve => {
      const obs1 = this.isHandset$.subscribe(value => {
        this.isHandsetValue = value;
        resolve(true);
      });

      this.subscriptions.push(obs1);
    });
  }

  // =============================

  abrirOpciones(id) {
    const plan_estado_id = this.listadoPlanes.find(plan => plan.plan_id === id)
      .plan_estado_id;

    const abrirOpciones = this.dialog.open(OpcionesPlanDialogComponent, {
      width: this.isHandsetValue ? '90%' : '500px',
      data: { plan_id: `${id}`, plan_estado_id: `${plan_estado_id}` }
    });

    abrirOpciones.afterClosed().subscribe(res => {
      if (res) {
        let url = '';
        const data = new FormData();

        data.append('plan_id', id);

        switch (res.option) {
          case 'anular':
            url = environment.apiUrl + '/Admins/Planes/anularPlan/';
            break;

          case 'activar':
            url = environment.apiUrl + '/Admins/Planes/activarPlan/';
            break;

          case 'finalizar':
            url = environment.apiUrl + '/Admins/Planes/finalizarPlan/';
            break;

          default:
            break;
        }

        this.httpRequest
          .postRequest(url, data)
          .pipe(map(result => result as MessageRequest))
          .subscribe(response => {
            if (response.status === 'success') {
              this.mostrarPlanes();
            } else {
              console.log(`${response.status}: ${response.message}`);
            }
          });
      }
    });
  }

  public showPlan(id: any) {
    const planToShow = this.listadoPlanes.find(
      eachPlan => eachPlan.plan_id === id
    );

    this.dialog.open(PlanesViewDialogComponent, {
      width: '90%',
      data: { plan: planToShow }
    });
  }

  tableFilterPlaceHolder() {
    return 'Filtrar planes';
  }
}
