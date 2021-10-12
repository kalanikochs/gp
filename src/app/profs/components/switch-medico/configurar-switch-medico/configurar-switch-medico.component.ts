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
import { GrupoMedico } from 'src/app/core/interfaces/grupoMedico.module';
import { AgregarMedicinaDialogComponent } from '../../dialogs/agregar-medicina-dialog/agregar-medicina-dialog.component';
import { ModificarMedicinaDialogComponent } from '../../dialogs/modificar-medicina-dialog/modificar-medicina-dialog.component';

@Component({
  selector: 'app-configurar-switch-medico',
  templateUrl: './configurar-switch-medico.component.html',
  styleUrls: ['./configurar-switch-medico.component.scss']
})
export class ConfigurarSwitchMedicoComponent implements OnInit {
  gruposalimenticios: Array<GrupoMedico> = [];
  alimentos: Array<Alimento> = [];
  gruposalimenticiosfc: FormGroup;
  alimentosfc: FormGroup;
  alimentosToShow: Array<Alimento> = [];
  asignarEjercicio: FormGroup;
  $other: any;
  $other2: Array<any>;

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

  initForm() {
    this.asignarEjercicio = this.formBuilder.group({
      ejercicio: ['', Validators.required],
      gruposalimenticiosfc: ['', Validators.required],
      alimentosfc: ['', Validators.required]
    });
  }

  traerGruposAlimenticios() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarGrupoMedico/`,
          data
        )
        .pipe(
          map(response => {
            //if (response.status === 'success') {
              console.log(response)
              return response.message as GrupoMedico[];
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
          `${environment.apiUrl}/shared/rutinas/mostrarIndicacionesM/`,
          data
        )
        .pipe(
          map(response => {
            if (response.status === 'success') {
              console.log(response.message)
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
    console.log(this.alimentosToShow)
    this.$other = event;
  }

  seleccionarAlimento(event: string) {
    console.log(event);
    this.$other2 = [{event}];
  }

  agregarAlimento() {
    console.log(this.gruposalimenticiosfc)
    if (this.$other !== '') {
      const grupodeportivoselected = this.gruposalimenticios.find(
        ga => ga.grupomedico_id == this.$other
      );

      console.log(this.gruposalimenticios[0].grupomedico_id)

      const crearAlimento = this.dialog.open(AgregarMedicinaDialogComponent , {
        width: this.deviceService.small ? '90%' : '600px',
        data: { grupomedico: grupodeportivoselected }
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
    //console.log(console.log(this.$other2[0].event))

    if (this.$other2) {
      const alimentoselected = this.alimentos.find(
        al => al.alimento_id == this.$other2[0].event
      );

      console.log(this.alimentos)

      const modificarAlimento = this.dialog.open(
        ModificarMedicinaDialogComponent,
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
