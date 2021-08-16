/* eslint-disable @typescript-eslint/member-ordering */
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
import { DeviceService } from 'src/app/core/services/device.service';

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
  userLogged$;

  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  subscriptions: Array<Subscription> = [];
  listadoPlanes: Plan[] = [];
  tipoProceso$: number;
  small: boolean;

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private userLogged: UserloginService,
    private httpRequest: HttpRequestService,
    private deviceService: DeviceService
  ) {
    this.small = this.deviceService.small;
    this.displayedColumns = this.small
      ? ['nombre', 'estado', 'opciones']
      : ['fecha', 'nombre', 'estado', 'opciones'];
  }

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
    await this.tipoProceso();
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

    const url = environment.apiUrl + '/Users/Planes/mostrarPlanes/';
    data.append('usuario_id', (this.userLogged$.id as unknown) as string);
    data.append('tipo_id', (this.tipoProceso$ as unknown) as string);

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

  private tipoProceso() {
    return new Promise(resolve => {
      const subc = this.userLogged.tipoProceso$.subscribe(tipo => {
        this.tipoProceso$ = tipo;
        resolve(true);
      });
      this.subscriptions.push(subc);
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

  asignarPlan() {
    /*  const nuevoPlan = this.dialog.open(AsignarPlanDialogComponent, {
      width: this.isHandsetValue ? '90%' : '600px'
    });

    nuevoPlan.afterClosed().subscribe(response => {
      console.log(response);
    }); */
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableFilterPlaceHolder() {
    return 'abdominal';
  }
}
