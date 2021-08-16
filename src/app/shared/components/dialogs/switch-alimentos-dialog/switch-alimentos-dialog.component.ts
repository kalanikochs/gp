import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwitchAlimentario } from 'src/app/core/interfaces/switchAlimentario.module';

@Component({
  selector: 'app-switch-alimentos-dialog',
  templateUrl: './switch-alimentos-dialog.component.html',
  styleUrls: ['./switch-alimentos-dialog.component.scss']
})
export class SwitchAlimentosDialogComponent implements OnInit {
  alimentos: Array<Alimento> = [];
  alimentosSustitutos: Array<Alimento> = [];
  formSwitchAlimenticio: FormGroup;
  alimentoActual: Alimento;
  informacionRutina: any;
  switchActual: SwitchAlimentario;

  constructor(
    public httpRequest: HttpRequestService,
    public dialogRef: MatDialogRef<SwitchAlimentosDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.buildForm();
    this.init();
  }

  async init() {
    //se trae el listado de alimentos
    await this.traerAlimentos();

    //se organiza la informacion
    this.organizarInformacion();

    //se muestra el nombre del alimento actual
    this.asignarAlimentoActual();

    //se filtra el listado de alimentos
    this.selecionarAlimentosSustitutos();
  }

  buildForm() {
    this.formSwitchAlimenticio = this.formBuilder.group({
      alimentoActual: [{ value: '', disabled: true }],
      alimentoSustituto: ['', [Validators.required]]
    });
  }

  modificarDieta() {
    if (this.formSwitchAlimenticio.valid) {
      //se empieza con el index del dia

      const indexDia = this.informacionRutina.dieta.findIndex(
        obj => obj.dia_id == this.switchActual.dia_id
      );

      //luego el index de la jornada

      const indexJornada = this.informacionRutina.dieta[
        indexDia
      ].jornadasalimenticias.findIndex(
        obj =>
          obj.jornadaalimenticia_id == this.switchActual.jornadaalimenticia_id
      );

      //luego el index del alimento
      const indexAlimento = this.informacionRutina.dieta[
        indexDia
      ].jornadasalimenticias[indexJornada].alimentos.findIndex(
        obj => obj.alimento_id == this.switchActual.alimento_id
      );

      //luego se cambia el alimento
      this.informacionRutina.dieta[indexDia].jornadasalimenticias[
        indexJornada
      ].alimentos[indexAlimento] = {
        alimento_id: this.formSwitchAlimenticio.value.alimentoSustituto
      };

      //se envian los cambios
      this.enviarCambios();
    }
  }

  enviarCambios() {
    const data = new FormData();
    data.append('rutina_id', this.data.rutina.rutina_id);
    data.append('rutina_informacion', JSON.stringify(this.informacionRutina));

    this.httpRequest
      .postRequest(
        `${environment.apiUrl}/shared/rutinas/editarInformacionRutina/`,
        data
      )
      .subscribe(result => {
        if (result.status === 'success') {
          alert(result.message);
        } else {
          console.log(result.message);
        }

        this.dialogRef.close();
      });
  }

  traerAlimentos() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarAlimentos/`,
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

  organizarInformacion() {
    this.switchActual = this.data.switchAlimentario;
    this.informacionRutina = JSON.parse(this.data.rutina.rutina_informacion);
  }

  asignarAlimentoActual() {
    this.alimentoActual = this.alimentos.find(
      alimento => alimento.alimento_id == this.switchActual.alimento_id
    );

    this.formSwitchAlimenticio.controls['alimentoActual'].setValue(
      this.alimentoActual.alimento_nombre
    );
  }

  selecionarAlimentosSustitutos() {
    this.alimentosSustitutos = this.alimentos.filter(
      alimento =>
        alimento.grupoalimenticio_id ==
          this.alimentoActual.grupoalimenticio_id &&
        alimento.alimento_id !== this.alimentoActual.alimento_id &&
        alimento.alimento_estado_id == '1'
    );
  }
}
