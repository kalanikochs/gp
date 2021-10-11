import { Component, OnInit } from '@angular/core';
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
import { GrupoPsicologia } from 'src/app/core/interfaces/grupoPsicologia.module';
import { AgregarPsicologiaDialogComponent } from '../../dialogs/agregar-psicologia-dialog/agregar-psicologia-dialog.component';
import { ModificarPsicologiaDialogComponent } from '../../dialogs/modificar-psicologia-dialog/modificar-psicologia-dialog.component';

@Component({
  selector: 'app-configurar-switch-psicologia',
  templateUrl: './configurar-switch-psicologia.component.html',
  styleUrls: ['./configurar-switch-psicologia.component.scss']
})
export class ConfigurarSwitchPsicologiaComponent implements OnInit {
  gruposalimenticios: Array<GrupoPsicologia> = [];
  alimentos: Array<Alimento> = [];
  gruposalimenticiosfc: FormGroup;
  alimentosfc: FormGroup;
  alimentosToShow: Array<Alimento> = [];
  asignarEjercicio: FormGroup;

  constructor(
    private httpRequest: HttpRequestService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.init();
    this.initForm();
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
          `${environment.apiUrl}/shared/rutinas/mostrarGruposPsicologia/`,
          data
        )
        .pipe(
          map(response => {
            //if (response.status === 'success') {
              console.log(response)
              return response.message as GrupoPsicologia[];
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
          `${environment.apiUrl}/shared/rutinas/mostrarIndicaciones/`,
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
    console.log(event)
  }

  agregarAlimento() {
    if (this.gruposalimenticiosfc.valid) {
      const grupodeportivoselected = this.gruposalimenticios.find(
        ga => ga.grupopsicologia_id == this.gruposalimenticiosfc.value
      );

      console.log(this.gruposalimenticios[0].grupopsicologia_id)

      const crearAlimento = this.dialog.open(AgregarPsicologiaDialogComponent , {
        width: this.deviceService.small ? '90%' : '600px',
        data: { grupopsicologia: grupodeportivoselected }
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
          content: 'Debes seleccionar un grupo de Terapias'
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
        ModificarPsicologiaDialogComponent,
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
          content: 'Debes seleccionar alguna indicación'
        }
      });
    }
  }

  initForm() {
    this.asignarEjercicio = this.formBuilder.group({
      ejercicio: ['', Validators.required],
      gruposalimenticiosfc: ['', Validators.required],

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
