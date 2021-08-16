import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { GrupoAlimenticio } from 'src/app/core/interfaces/grupoAlimenticio.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alimentos-upload',
  templateUrl: './alimentos-upload.component.html',
  styleUrls: ['./alimentos-upload.component.scss']
})
export class AlimentosUploadComponent implements OnInit {
  grupoalimenticio: Array<GrupoAlimenticio> = [];
  alimentos: Array<Alimento> = [];
  alimentosToShow: Array<Alimento> = [];
  formAlimentos: FormGroup;
  alimentosArray = [];
  displayedColumns: string[] = ['alimento'];
  dataSource = new MatTableDataSource();

  @Output() alimentosToAdd = new EventEmitter();
  constructor(
    private overlayContainer: OverlayContainer,
    private httpRequest: HttpRequestService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.init();
  }

  // ===========================

  async init() {
    await this.traerGruposAlimenticios();
    await this.traerAlimentos();
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

  // ===========================

  buildForm() {
    this.formAlimentos = this.formBuilder.group({
      grupoalimenticio: ['', [Validators.required]],
      alimento: ['', [Validators.required]]
    });
  }

  organizarAlimentosArray() {}

  setMaterialContainer() {
    this.overlayContainer
      .getContainerElement()
      .classList.add('users-material-container');
  }

  selecionarAlimentosGrupos(event: string) {
    this.alimentosToShow = this.alimentos.filter(
      alimento =>
        alimento.grupoalimenticio_id === event &&
        alimento.alimento_estado_id == '1'
    );
  }

  agregarAlimento() {
    if (this.formAlimentos.valid) {
      // tslint:disable-next-line: variable-name
      const alimentoId = this.formAlimentos.value.alimento;
      // agrego el id al array
      this.alimentosArray.push(alimentoId);

      this.dataSource.data = this.alimentosArray;

      this.emitirAlimentos();
    }
  }

  borrarAlimento(alimentoId) {
    const index = this.alimentosArray.indexOf(alimentoId);
    this.alimentosArray.splice(index, 1);
    this.dataSource.data = this.alimentosArray;

    this.emitirAlimentos();
  }

  nombreAlimento(alimentoId) {
    return this.alimentos.find(alimento => alimento.alimento_id === alimentoId)
      .alimento_nombre;
  }

  emitirAlimentos() {
    this.alimentosToAdd.emit(this.alimentosArray);
  }
}
