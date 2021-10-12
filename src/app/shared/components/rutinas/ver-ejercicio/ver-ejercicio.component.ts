import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { Dia } from 'src/app/core/interfaces/dia.module';
import { GrupoDeportivo } from 'src/app/core/interfaces/grupoDeportivo.module';
import { JornadaDeportiva } from 'src/app/core/interfaces/jornadadeportiva.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { UserLogged } from 'src/app/core/interfaces/userLogged.module';
import { SwitchAlimentario } from 'src/app/core/interfaces/switchAlimentario.module';
import { Observaciones } from 'src/app/core/interfaces/observaciones.module';

@Component({
  selector: 'app-ver-ejercicio',
  templateUrl: './ver-ejercicio.component.html',
  styleUrls: ['./ver-ejercicio.component.scss']
})
export class VerEjercicioComponent implements OnInit {
  @Input() informacion: any;

  @Input() userLogin$: UserLogged;

  @Output() switchAlimentario: EventEmitter<SwitchAlimentario>= new EventEmitter();

  dieta: Array<any> = [];

  dias: Array<Dia> = [];

  alimentos: Array<Alimento> = [];

  jornadaalimenticia: Array<JornadaDeportiva> = [];

  grupoalimenticio: Array<GrupoDeportivo> = [];

  alimentosToShow: Array<Alimento> = [];

  observaciones: Array<Observaciones> = [];

  constructor(private httpRequest: HttpRequestService) {}

  ngOnInit() {
    this.init();
  }

  private asignarDieta() {
    return new Promise(resolve => {
      // 1. verificar que el objeto no este vacio

      if (this.informacion.rutina.rutina_informacion !== '') {
        // 2. verificar que el objeto tenga el componetne dieta
        const infoJSON = JSON.parse(this.informacion.rutina.rutina_informacion);

        if (infoJSON.dieta) {
          // 3. asignar la información a la variable dieta
          this.dieta = infoJSON.dieta;
          resolve(true);
        }
      }
    });
  }

  // ==============================
  async init() {
    await this.traerDias();
    await this.traerJornadasAlimenticias();
    await this.traerGruposAlimenticios();
    await this.traerAlimentos();
    await this.asignarDieta();
    await this.traerObservaciones();
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

  traerObservaciones() {
    return new Promise(resolve => {
      const data = new FormData();
      data.append('rutina_id', localStorage.getItem('plan_id'))

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarRutina/`,
          data
        )
        .pipe(
          map(response => {
            console.log(response)
            if (response.status === 'success') {
              const $dbResponse = JSON.parse(response.message[0].rutina_informacion);
              this.observaciones = $dbResponse.dieta[0].jornadasalimenticias[0].observaciones[0].observaciones;
              console.log(this.observaciones)
              //console.log($dbResponse.dieta[0].jornadasalimenticias[0].observaciones[0].observaciones)
            }/* else {
              console.log(response.message);
              return [];
            }*/
          })
        )
        .subscribe(result => {
          //this.observaciones = result;
          resolve(true);
        });
    });
  }

  // ===============================

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
        jornada.jornadaalimenticia_id.toString()
    ).jornadadeportiva_nombre;

    console.log(this.jornadaalimenticia)
  }

  findAlimento(alimento) {
    return this.alimentos.find(
      cetteal => cetteal.alimento_id === alimento.alimento_id.toString()
    ).alimento_nombre;
  }

  findObservacion(jornada: any) {
    return this.observaciones;
  }

  switchAlimentos(dia: any, jornadaalimenticia: any, alimento: any) {
    if (this.userLogin$.type.toString() == '2' && this.informacion.plan.plan_estado_id == '1') {
      const dia_id = dia.dia_id;
      const jornadaalimenticia_id = jornadaalimenticia.jornadaalimenticia_id;
      const alimento_id = alimento.alimento_id;
      const observaciones = jornadaalimenticia.observaciones

      const thisSwitch:SwitchAlimentario = {
        dia_id: dia_id.toString(),
        jornadaalimenticia_id: jornadaalimenticia_id.toString(),
        alimento_id: alimento_id.toString()
      };

      this.switchAlimentario.emit(thisSwitch);
    }
  }
}
