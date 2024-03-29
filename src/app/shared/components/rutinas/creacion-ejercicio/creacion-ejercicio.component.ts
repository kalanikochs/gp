import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { Dia } from 'src/app/core/interfaces/dia.module';
import { GrupoAlimenticio } from 'src/app/core/interfaces/grupoAlimenticio.module';
import { GrupoDeportivo } from 'src/app/core/interfaces/grupoDeportivo.module';
import { JornadaAlimenticia } from 'src/app/core/interfaces/jornadaalimenticia.module';
import { JornadaDeportiva } from 'src/app/core/interfaces/jornadadeportiva.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creacion-ejercicio',
  templateUrl: './creacion-ejercicio.component.html',
  styleUrls: ['./creacion-ejercicio.component.scss']
})
export class CreacionEjercicioComponent implements OnInit {
  dieta: Array<any> = [];

  dias: Array<Dia> = [];

  alimentos: Array<Alimento> = [];

  jornadaalimenticia: Array<JornadaDeportiva> = [];

  grupoalimenticio: Array<GrupoDeportivo> = [];

  formDieta: FormGroup;

  alimentosToShow: Array<Alimento> = [];

  observaciones: Array<any> = [];

  @Output() dietaToAdd = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private overlayContainer: OverlayContainer,
    private httpRequest: HttpRequestService
  ) {
    this.setMaterialContainer();
  }

  ngOnInit() {
    this.buildForm();
    this.init();
  }

  // ==============================
  async init() {
    await this.traerDias();
    await this.traerJornadasAlimenticias();
    await this.traerGruposAlimenticios();
    await this.traerAlimentos();
  }

  traerDias() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(`${environment.apiUrl}/shared/rutinas/mostrarDias/`, data)
        .pipe(
          map(response => {
            if (response.status === 'success') {
              return response.message as Dia[];
            } else {
              console.log(response.message);
              return [];
            }
          })
        )
        .subscribe(result => {
          this.dias = result;
          resolve(true);
        });
    });
  }

  traerJornadasAlimenticias() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarJornadasDeportivas/`,
          data
        )
        .pipe(
          map(response => {
            if (response.status === 'success') {
              return response.message as JornadaDeportiva[];
            } else {
              console.log(response.message);
              return [];
            }
          })
        )
        .subscribe(result => {
          this.jornadaalimenticia = result;
          resolve(true);
        });
    });
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
            if (response.status === 'success') {
              return response.message as GrupoDeportivo[];
            } else {
              console.log(response.message);
              return [];
            }
          })
        )
        .subscribe(result => {
          this.grupoalimenticio = result;
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

  // ===============================

  setMaterialContainer() {
    this.overlayContainer
      .getContainerElement()
      .classList.add('default-material-container');
  }

  buildForm() {
    this.formDieta = this.formBuilder.group({
      dia: ['', [Validators.required]],
      jornadaalimenticia: ['', [Validators.required]],
      grupoalimenticio: ['', [Validators.required]],
      alimento: ['', [Validators.required]],
      observaciones: ['', [Validators.required]]
    });
  }

  cantidadDeAlimentosDia(dia: any) {
    let cantidadAlimentos = 0;


    for (const jornadaalimenticia of dia.jornadasalimenticias) {
      for (const alimento of jornadaalimenticia.alimentos) {
        cantidadAlimentos++;
      }
    }

    return cantidadAlimentos;
  }

  cantidadDeJornadasDia(dia: any) {
    let cantidadJornadas = 0;

    for (const jornadaalimenticia of dia.jornadasalimenticias) {
      cantidadJornadas++;
    }

    return cantidadJornadas;
  }

  findDia(dia: any) {
    return this.dias.find(cettedia => cettedia.dia_id === dia.dia_id.toString())
      .dia_nombre;
  }

  findJornada(jornada: any) {
    return this.jornadaalimenticia.find(
      cettejornada =>
        cettejornada.jornadadeportiva_id ===
        jornada.jornadaalimenticia_id
    ).jornadadeportiva_nombre;

  }

  findAlimento(alimento) {
    return this.alimentos.find(
      cetteal => cetteal.alimento_id === alimento.alimento_id.toString()
    ).alimento_nombre;
  }

  getObs(observaciones) {
    return 'abcde';
  }

  ordenarDieta() {
    // se ordenan los dias
    this.dieta.sort((a, b) => {
      return parseInt(a.dia_id, 0) - parseInt(b.dia_id, 0);
    });

    // se ordenan las jornadas
    for (const dia of this.dieta) {
      dia.jornadasalimenticias.sort((a, b) => {
        return (
          parseInt(a.jornadadeportiva_id, 0) -
          parseInt(b.jornadadeportiva_id, 0)
        );
      });
    }
  }

  agregarAlimentoDieta() {
    if (this.formDieta.valid) {
      // 1. se busca si existe el dia

      let diaToSearch = this.dieta.find(
        dia => dia.dia_id === this.formDieta.value.dia
      );

      // 1.1 si no existe agregarlo

      if (!diaToSearch) {
        this.dieta.push({
          dia_id: this.formDieta.value.dia,
          jornadasalimenticias: [],
          observaciones: []
        });

        diaToSearch = this.dieta.find(
          dia => dia.dia_id === this.formDieta.value.dia
        );
      }

      const indexDia = this.dieta.indexOf(diaToSearch);

      // 2. se busca si existe la jornada

      let jornadaToSearch = diaToSearch.jornadasalimenticias.find(
        jornada =>
          jornada.jornadaalimenticia_id ===
          this.formDieta.value.jornadaalimenticia
      );

      console.log(diaToSearch)

      // 2.1 si no existe agregarla
      if (!jornadaToSearch) {
        this.dieta[indexDia].jornadasalimenticias.push({
          jornadaalimenticia_id: this.formDieta.value.jornadaalimenticia,
          alimentos: [],
          observaciones: []
        });

        jornadaToSearch = diaToSearch.jornadasalimenticias.find(
          jornada =>
            jornada.jornadaalimenticia_id ===
            this.formDieta.value.jornadaalimenticia
        );
      }

      const indexJornada = this.dieta[indexDia].jornadasalimenticias.indexOf(
        jornadaToSearch
      );

      // 3. se busca si existe el alimento

      const alimentoToSearch = jornadaToSearch.alimentos.find(
        alimento => alimento.alimento_id === this.formDieta.value.alimento
      );

      // 3.1 si no existe agreguelo

      if (!alimentoToSearch) {
        this.dieta[indexDia].jornadasalimenticias[indexJornada].alimentos.push({
          alimento_id: this.formDieta.value.alimento
        });
      }

      //this.dieta[indexDia]

      this.dieta[indexDia].jornadasalimenticias[indexJornada].observaciones.push({
        observaciones: this.formDieta.value.observaciones
      });

      this.ordenarDieta();
      this.emitirDieta();
      setTimeout(() => {
        this.setToBottom();
      }, 200);


      const data = new FormData();
      const url = `${environment.apiUrl}/shared/rutinas/agregarObservacion/`;
      data.append('jornadaalimenticia_id', this.formDieta.value.jornadaalimenticia);
      data.append('observacion', this.formDieta.value.observaciones);

      this.httpRequest
        .postRequest(url, data)
        .pipe(
          map(response => {
            console.log(response)
            if(response.status == 'success') {
              alert(response.message.message)
              console.log(response)
              //window.location.reload()
            }
          })
        )
        .subscribe(response => {
          console.log(response)
        });

    } else {
      alert('Por favor carga la información completamente');
    }
  }

  emitirDieta() {
    //const dietaToExport = JSON.stringify(this.dieta);
    this.dietaToAdd.emit(this.dieta);
    //console.log('emitido:' + JSON.stringify(this.dieta))
  }

  selecionarAlimentosGrupos(event: string) {
    this.alimentosToShow = this.alimentos.filter(
      alimento =>
        alimento.grupoalimenticio_id === event &&
        alimento.alimento_estado_id == '1'
    );
  }

  borrarAlimento(diaIndex, jornadaIndex, alimentoIndex) {
    // 1. borro el alimento
    this.dieta[diaIndex].jornadasalimenticias[jornadaIndex].alimentos.splice(
      alimentoIndex,
      1
    );

    // 2. si la jornada se queda vacia tambien la borro

    if (
      this.dieta[diaIndex].jornadasalimenticias[jornadaIndex].alimentos.length <
      1
    ) {
      this.dieta[diaIndex].jornadasalimenticias.splice(jornadaIndex, 1);
    }

    // 3. si el dia se queda sin jornadas lo borro
    if (this.dieta[diaIndex].jornadasalimenticias.length < 1) {
      this.dieta.splice(diaIndex, 1);
    }
  }

  setToBottom() {
    const asignarRutinaDiv = document.getElementById('asignarRutina');
    asignarRutinaDiv.scrollTop = asignarRutinaDiv.scrollHeight;
  }
}
