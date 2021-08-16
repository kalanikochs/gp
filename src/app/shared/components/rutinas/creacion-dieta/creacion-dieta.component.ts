import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { Dia } from 'src/app/core/interfaces/dia.module';
import { GrupoAlimenticio } from 'src/app/core/interfaces/grupoAlimenticio.module';
import { JornadaAlimenticia } from 'src/app/core/interfaces/jornadaalimenticia.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creacion-dieta',
  templateUrl: './creacion-dieta.component.html',
  styleUrls: ['./creacion-dieta.component.scss']
})
export class CreacionDietaComponent implements OnInit {
  dieta: Array<any> = [];

  dias: Array<Dia> = [];

  alimentos: Array<Alimento> = [];

  jornadaalimenticia: Array<JornadaAlimenticia> = [];

  grupoalimenticio: Array<GrupoAlimenticio> = [];

  formDieta: FormGroup;

  alimentosToShow: Array<Alimento> = [];

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
          `${environment.apiUrl}/shared/rutinas/mostrarJornadasAlimenticias/`,
          data
        )
        .pipe(
          map(response => {
            if (response.status === 'success') {
              return response.message as JornadaAlimenticia[];
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
          `${environment.apiUrl}/shared/rutinas/mostrarGruposAlimenticios/`,
          data
        )
        .pipe(
          map(response => {
            if (response.status === 'success') {
              return response.message as GrupoAlimenticio[];
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
      alimento: ['', [Validators.required]]
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
        cettejornada.jornadaalimenticia_id ===
        jornada.jornadaalimenticia_id.toString()
    ).jornadaalimenticia_nombre;
  }

  findAlimento(alimento) {
    return this.alimentos.find(
      cetteal => cetteal.alimento_id === alimento.alimento_id.toString()
    ).alimento_nombre;
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
          parseInt(a.jornadaalimenticia_id, 0) -
          parseInt(b.jornadaalimenticia_id, 0)
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
          jornadasalimenticias: []
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

      // 2.1 si no existe agregarla
      if (!jornadaToSearch) {
        this.dieta[indexDia].jornadasalimenticias.push({
          jornadaalimenticia_id: this.formDieta.value.jornadaalimenticia,
          alimentos: []
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

      this.ordenarDieta();
      this.emitirDieta();
      setTimeout(() => {
        this.setToBottom();
      }, 200);
    } else {
      alert('Por favor carga la información completamente');
    }
  }

  emitirDieta() {
    //const dietaToExport = JSON.stringify(this.dieta);
    this.dietaToAdd.emit(this.dieta);
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
