import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { AsignarRutinaDialogComponent } from '../../dialogs/asignar-rutina-dialog/asignar-rutina-dialog.component';
import { Rutina } from 'src/app/core/interfaces/rutina.module';
import { Plan } from 'src/app/core/interfaces/plan.module';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { RutinasViewDialogComponent } from '../../dialogs/rutinas-view-dialog/rutinas-view-dialog.component';
import { SwitchAlimentosDialogComponent } from '../../dialogs/switch-alimentos-dialog/switch-alimentos-dialog.component';

@Component({
  selector: 'app-listado-rutinas',
  templateUrl: './listado-rutinas.component.html',
  styleUrls: ['./listado-rutinas.component.scss']
})
export class ListadoRutinasComponent
  implements OnInit, OnDestroy, AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isHandsetValue: boolean;
  userLogin$;
  planId: any;
  planActual: Plan;
  listadoRutinas: Rutina[] = [];
  subscriptions = [];

  displayedColumns: string[] = ['fecha', 'nombre', 'opciones'];
  dataSource = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private userLogged: UserloginService,
    private activatedRoute: ActivatedRoute,
    private httpRequest: HttpRequestService
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

  //===============================================

  async init() {
    await this.verifyLogin();

    await this.asignHandsetValue();

    await this.traerIdPlan();

    await this.traerPlanActual();

    await this.traerRutinas();
  }

  private verifyLogin() {
    const subscription2 = this.userLogged.userLoggedObs$.subscribe(userInfo => {
      this.userLogin$ = userInfo;
    });
    this.subscriptions.push(subscription2);
  }

  private traerPlanActual() {
    return new Promise(resolve => {
      const url = environment.apiUrl + '/shared/planes/mostrarPlanActual/';
      const data = new FormData();
      data.append('plan_id', this.planId);

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

  private traerIdPlan() {
    return new Promise(resolve => {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.planId = params.planId;
        resolve(true);
      });
    });
  }

  private traerRutinas() {
    return new Promise(resolve => {
      const url = environment.apiUrl + '/shared/rutinas/mostrarRutinas/';
      const data = new FormData();
      data.append('plan_id', this.planId);
      this.httpRequest
        .postRequest(url, data)
        .pipe(map(result => result as MessageRequest))
        .subscribe(response => {
          if (response.status === 'success') {
            this.listadoRutinas = response.message;           
            this.dataSource.data = this.listadoRutinas;
            resolve(true);
          }
        });
    });
  }

  private asignHandsetValue() {
    return new Promise(resolve => {
      const obs1 = this.isHandset$.subscribe(value => {
        this.isHandsetValue = value;
        resolve(true);
      });

      this.subscriptions.push(obs1);
    });
  }

  // ==============================================

  verRutina(index: any) {
    const rutinaToShow = this.listadoRutinas.find(
      rutina => rutina.rutina_id === index
    );
    const verRutina = this.dialog.open(RutinasViewDialogComponent, {
      data: { rutina: rutinaToShow, plan: this.planActual },
      width: this.isHandsetValue ? '90%' : '600px'
    });

    verRutina.afterClosed().subscribe(response=>{
      if (response && response.opcionSwitchAlimentario) {
        //se abre el Dialogo de Switch Alimentario
        const switchAlDialog = this.dialog.open(SwitchAlimentosDialogComponent,{
          data:{switchAlimentario:response.switchAlimentario,rutina:rutinaToShow},
          width: this.isHandsetValue ? '90%' : '600px'
        })

        //una vez se cierra, se actualiza la dieta
        switchAlDialog.afterClosed().subscribe(async ()=>{
          await this.traerRutinas();
          //se vuelve a abrir el dialogo de verRutina
          this.verRutina(index);
        })

        
      }
    })
  }

  asignarRutina() {
    const nuevaRutina = this.dialog.open(AsignarRutinaDialogComponent, {
      width: this.isHandsetValue ? '90%' : '700px',
      data: this.planActual
    });

    nuevaRutina.afterClosed().subscribe(data => {
      if (!data) {
        return;
      }

      data.append('plan_id', this.planId);

      const url = environment.apiUrl + '/Shared/Rutinas/agregarRutina/';

      this.httpRequest
        .postRequest(url, data)
        .pipe(map(result => result as MessageRequest))
        .subscribe(response => {
          console.log(response);
          if (response.status === 'success') {
            alert('Se ha creado la rutina con exito');
            this.traerRutinas();
          } else {
            console.log(`${response.status}: ${response.message}`);
          }
        });

      /*  this.httpRequest.postText(url, data).subscribe(result => {
        console.log(result);
      }); */
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableFilterPlaceHolder() {
    return 'adbomen';
  }
}
