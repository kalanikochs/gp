import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanesViewDialogComponent } from 'src/app/shared/components/dialogs/planes-view-dialog/planes-view-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { Plan } from 'src/app/core/interfaces/plan.module';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { AsignarPlanDialogComponent } from 'src/app/shared/components/dialogs/asignar-plan-dialog/asignar-plan-dialog.component';
import { UserLogged } from 'src/app/core/interfaces/userLogged.module';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { OpcionesPlanDialogComponent } from 'src/app/shared/components/dialogs/opciones-plan-dialog/opciones-plan-dialog.component';

@Component({
  selector: 'app-listado-planes',
  templateUrl: './listado-planes.component.html',
  styleUrls: ['./listado-planes.component.scss']
})
export class ListadoPlanesComponent
  implements OnInit, OnDestroy, AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isHandsetValue: boolean;
  userLogged$: UserLogged;

  displayedColumns: string[] = [
    'fecha',
    'nombre',
    'usuario',
    'estado',
    'opciones'
  ];
  dataSource = new MatTableDataSource();
  subscriptions: Array<Subscription> = [];
  listadoPlanes: Plan[] = [];
  tipoProceso$: number;

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private userLogged: UserloginService,
    private httpRequest: HttpRequestService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    await this.verifyLogin();
    await this.handsetSubscribre();
    this.mostrarPlanes();
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

  private mostrarPlanes() {
    const personType = this.userLogged$.type;

    const data = new FormData();

    const url = environment.apiUrl + '/Profs/Planes/mostrarPlanes/';
    data.append('profesional_id', (this.userLogged$.id as unknown) as string);

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

  // =========================================

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      el.unsubscribe();
    });
  }

  public showPlan(id: any) {
    const planToShow = this.listadoPlanes.find(
      eachPlan => eachPlan.plan_id === id
    );

    this.dialog.open(PlanesViewDialogComponent, {
      width: this.isHandsetValue ? '90%' : '600px',
      data: { plan: planToShow }
    });
  }

  showPlanesOptions(id) {
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

  asignarPlan() {
    const nuevoPlan = this.dialog.open(AsignarPlanDialogComponent, {
      width: this.isHandsetValue ? '90%' : '600px'
    });

    nuevoPlan.afterClosed().subscribe(data => {
      if (!data) {
        return;
      }

      const planTipo = this.userLogged$.type - 1;

      data.append('plan_profesional', this.userLogged$.id.toString());
      data.append('plan_tipo', planTipo.toString());

      const url = environment.apiUrl + '/Profs/Planes/agregarPlan/';

      this.httpRequest
        .postRequest(url, data)
        .pipe(map(result => result as MessageRequest))
        .subscribe(response => {
          console.log(response);
          if (response.status === 'success') {
            alert('Se ha creado el plan con exito');
            this.mostrarPlanes();
          } else {
            console.log(`${response.status}: ${response.message}`);
          }
        });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
