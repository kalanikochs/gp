import { Component, OnInit } from '@angular/core';
import { GrupoDeportivo } from 'src/app/core/interfaces/grupoDeportivo.module';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from 'src/app/shared/components/dialogs/basic-dialog/basic-dialog.component';
import { AgregarEjercicioDialogComponent } from '../../dialogs/agregar-ejercicio-dialog/agregar-ejercicio-dialog.component';
import { DeviceService } from 'src/app/core/services/device.service';
import { ModificarEjercicioDialogComponent } from '../../dialogs/modificar-ejercicio-dialog/modificar-ejercicio-dialog.component';

@Component({
  selector: 'app-configurar-switch-deportivo',
  templateUrl: './configurar-switch-deportivo.component.html',
  styleUrls: ['./configurar-switch-deportivo.component.scss']
})
export class ConfigurarSwitchDeportivoComponent implements OnInit {
  gruposalimenticios: Array<GrupoDeportivo> = [];
  alimentos: Array<Alimento> = [];
  gruposalimenticiosfc: FormControl;
  alimentosfc: FormControl;
  alimentosToShow: Array<Alimento> = [];
  asignarEjercicio: FormGroup;

  constructor(
    private httpRequest: HttpRequestService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.buildFormControls();
    this.init();
    this.initForm();
  }

  private buildFormControls() {
    this.gruposalimenticiosfc = new FormControl('', [Validators.required]);
    this.alimentosfc = new FormControl('', [Validators.required]);
  }

  async init() {
    await this.traerGruposAlimenticios();
    await this.traerAlimentos();
  }

  traerGruposAlimenticios() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarGruposDeportivos/`,
          data
        )
        .pipe(
          map(response => {
            //if (response.status === 'success') {
              return response.message as GrupoDeportivo[];
            /*} else {
              //console.log(response.message);
              return response.message as GrupoAlimenticio[];
            }*/
          })
        )
        .subscribe(result => {
          this.gruposalimenticios = result;
          if(!this.gruposalimenticios) {
            this.gruposalimenticios = []
          }
          resolve(true);
        });
    });
  }

  traerAlimentos() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarEjercicios/`,
          data
        )
        .pipe(
          map(response => {
            if (response.status === 'success') {
              return response.message as Alimento[];
            } else {
              console.log(response.message);
              return [];
            }
          })
        )
        .subscribe(result => {
          this.alimentos = result;
          resolve(true);
        });
    });
  }

  selecionarAlimentosGrupos(event: string) {
    this.alimentosToShow = this.alimentos.filter(
      alimento => alimento.grupoalimenticio_id === event
    );
  }

  agregarAlimento() {
    if (this.gruposalimenticiosfc.valid) {
      const grupodeportivoselected = this.gruposalimenticios.find(
        ga => ga.grupodeportivo_id == this.gruposalimenticiosfc.value
      );

      console.log(this.gruposalimenticios[0].grupodeportivo_id)

      const crearAlimento = this.dialog.open(AgregarEjercicioDialogComponent , {
        width: this.deviceService.small ? '90%' : '600px',
        data: { grupodeportivo: grupodeportivoselected }
      });

      crearAlimento.afterClosed().subscribe(result => {
        if (result.reload) {
          window.location.reload();
        }
      });
    } else {
      this.dialog.open(BasicDialogComponent, {
        data: {
          title: 'Alerta',
          content: 'Debes seleccionar un grupo alimenticio'
        }
      });
    }
  }

  modificarAlimento() {
    if (this.alimentosfc.valid) {
      const alimentoselected = this.alimentos.find(
        al => al.alimento_id == this.alimentosfc.value
      );

      console.log(this.alimentos)

      const modificarAlimento = this.dialog.open(
        ModificarEjercicioDialogComponent,
        {
          width: this.deviceService.small ? '90%' : '600px',
          data: { alimento: alimentoselected }
        }
      );

      modificarAlimento.afterClosed().subscribe(result => {
        if (result.reload) {
          window.location.reload();
        }
      });
    } else {
      this.dialog.open(BasicDialogComponent, {
        data: {
          title: 'Alerta',
          content: 'Debes seleccionar un alimento'
        }
      });
    }
  }

  initForm() {
    this.asignarEjercicio = this.formBuilder.group({
      ejercicio: ['', Validators.required],
    });
  }

  agregarEjercicio() {
    if (this.asignarEjercicio.valid) {
      const data = new FormData();
      data.append('ejercicio', this.asignarEjercicio.value.ejercicio);

      const url = `${environment.apiUrl}/shared/rutinas/agregarEjercicio/`;

      this.httpRequest
        .postRequest(url, data)
        .pipe(
          map(response => {
            console.log(response)
            if(response.status == 'success') {
              alert(response.message.message)
            }
          })
        )
        .subscribe(response => {
          console.log(response)
        });
    } else {
      alert('El campo no puede estar vacío');
    }
  }
}
