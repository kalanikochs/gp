import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';
import { OpcionesPersonaDialogComponent } from '../../dialogs/opciones-persona-dialog/opciones-persona-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AgregarPersonaDialogComponent } from '../../dialogs/agregar-persona-dialog/agregar-persona-dialog.component';
import { VerPersonaDialogComponent } from '../../dialogs/ver-persona-dialog/ver-persona-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Persona } from 'src/app/core/interfaces/persona.module';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { ProfileDialogComponent } from 'src/app/shared/components/dialogs/profile-dialog/profile-dialog.component';
import { AcceptDeclineDialogComponent } from 'src/app/shared/components/dialogs/accept-decline-dialog/accept-decline-dialog.component';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styles: []
})
export class ListadoUsuariosComponent
  implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'estado', 'opciones'];
  dataSource = new MatTableDataSource();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isHandsetValue: boolean;
  subscriptions = [];
  listadoUsuarios: Persona[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
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
    this.subscriptions.forEach(el => {
      el.unsubscribe();
    });
  }

  // ===================================

  async init() {
    await this.handsetSubscribre();
    this.mostrarUsuarios();
  }

  private mostrarUsuarios() {
    const data = new FormData();

    const url = environment.apiUrl + '/Admins/Users/mostrarUsuarios/';

    this.httpRequest
      .postRequest(url, data)
      .pipe(
        map(response => {
          if (response.status === 'success') {
            return response.message as Persona[];
          } else {
            console.log(response.message);
            return [];
          }
        })
      )
      .subscribe(response => {
        this.listadoUsuarios = response;
        this.dataSource.data = this.listadoUsuarios;
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

  // ==================================

  verPersona(id) {
    const persona = this.listadoUsuarios.find(prof => prof.persona_id === id);

    this.dialog.open(VerPersonaDialogComponent, {
      width: this.isHandsetValue ? '90%' : '700px',
      data: { persona, persona_tipo: 'usuario' }
    });
  }

  opcionesUsuario(id) {
    const persona_estado_id = this.listadoUsuarios.find(
      prof => prof.persona_id === id
    ).persona_estado_id;

    const opcionesUsuario = this.dialog.open(OpcionesPersonaDialogComponent, {
      width: this.isHandsetValue ? '90%' : '500px',
      data: {
        persona_id: `${id}`,
        persona_estado_id: `${persona_estado_id}`,
        persona_tipo: 'usuario'
      }
    });

    opcionesUsuario.afterClosed().subscribe(async res => {
      if (res) {
        if (res.option == 'modificar') {
          this.modificarPersona(id);
          return;
        }

        if (res.option == 'eliminar') {
          const confirmacionEliminacion = () =>
            new Promise((resolve) => {
              const tipo = 'usuario';

              const confirmarEliminar = this.dialog.open(
                AcceptDeclineDialogComponent,
                {
                  data: {
                    title: `Eliminar ${tipo}`,
                    content: `Estas seguro de que deseas eliminar este ${tipo}`
                  }
                }
              );

              confirmarEliminar.afterClosed().subscribe(res => {
                resolve(res);
              });
            });

          const confirmacion = await confirmacionEliminacion();

          if (!confirmacion) {
            return;
          }
        }

        let url = '';
        const data = new FormData();

        data.append('usuario_id', id);

        switch (res.option) {
          case 'anular':
            url = environment.apiUrl + '/Admins/Users/suspenderUsuario/';
            break;

          case 'activar':
            url = environment.apiUrl + '/Admins/Users/activarUsuario/';
            break;

          case 'eliminar':
            url = environment.apiUrl + '/Admins/Users/eliminarUsuario/';
            break;

          default:
            break;
        }

        this.httpRequest
          .postRequest(url, data)
          .pipe(map(result => result as MessageRequest))
          .subscribe(response => {
            if (response.status === 'success') {
              this.mostrarUsuarios();
            } else {
              console.log(`${response.status}: ${response.message}`);
            }
          });
      }
    });
  }

  modificarPersona($idPersona: any) {
    const personaNF: Persona = this.listadoUsuarios.find(
      usuario => usuario.persona_id == $idPersona
    );

    const personaF: any = {
      id: personaNF.persona_id,
      nombres: personaNF.persona_nombres,
      apellidos: personaNF.persona_apellidos,
      direccion: personaNF.persona_direccion,
      telefono: personaNF.persona_telefono,
      documento: personaNF.persona_documento,
      email: personaNF.persona_email,
      contrasena: personaNF.persona_contrasena
    };

    const profileDialog = this.dialog.open(ProfileDialogComponent, {
      width: this.isHandsetValue ? '90%' : '600px',
      data: personaF
    });

    profileDialog.afterClosed().subscribe(() => {
      this.mostrarUsuarios();
    });
  }

  agregarUsuario() {
    const agregarPersona = this.dialog.open(AgregarPersonaDialogComponent, {
      width: this.isHandsetValue ? '90%' : '700px',
      data: { persona_tipo: 'usuario' }
    });

    agregarPersona.afterClosed().subscribe(data => {
      if (data) {
        const url = environment.apiUrl + '/Admins/Users/agregarUsuario/';
        this.httpRequest
          .postRequest(url, data)
          .pipe(map(result => result as MessageRequest))
          .subscribe(response => {
            if (response.status === 'success') {
              this.mostrarUsuarios();
            } else {
              console.log(`${response.status}: ${response.message}`);
            }
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableFilterPlaceHolder() {
    return 'Ej. Antonio';
  }
}
