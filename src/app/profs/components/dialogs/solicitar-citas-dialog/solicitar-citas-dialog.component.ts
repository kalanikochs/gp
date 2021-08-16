import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Persona } from 'src/app/core/interfaces/persona.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitar-citas-dialog',
  templateUrl: './solicitar-citas-dialog.component.html',
  styleUrls: ['./solicitar-citas-dialog.component.scss']
})
export class SolicitarCitasDialogComponent implements OnInit {
  citasApplyForm: FormGroup;
  listadoUsuarios: Persona[];
  tipoProceso: string;
  tiposCitas: any;
  showForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpRequest: HttpRequestService,
    public dialogRef: MatDialogRef<SolicitarCitasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initForm();
    this.init();
  }

  async init() {
    console.log(this.data.tipoProceso);
    this.tipoProceso = this.data.tipoProceso;

    await this.traerUsuarios();
    await this.traerTipoCita();

    this.showForm = true;
  }

  private traerUsuarios() {
    return new Promise(resolve => {
      const data = new FormData();
      data.append('tipo_id', this.tipoProceso);
      const thisUrl = environment.apiUrl + '/Profs/Users/mostrarUsuarios/';
      this.httpRequest
        .postRequest(thisUrl, data)
        .pipe(
          map(response =>
            response.status === 'success' ? (response.message as Persona[]) : []
          )
        )
        .subscribe(response => {
          this.listadoUsuarios = response;
          resolve(true);
        });
    });
  }

  private traerTipoCita() {
    return new Promise(resolve => {
      const data = new FormData();
      data.append('tipo_id', this.tipoProceso);
      const thisUrl = environment.apiUrl + '/Users/Citas/mostrarTipoCita/';
      this.httpRequest
        .postRequest(thisUrl, data)
        .pipe(
          map(response =>
            response.status === 'success' ? response.message : []
          )
        )
        .subscribe(response => {
          this.tiposCitas = response;
          resolve(true);
        });
    });
  }

  initForm() {
    this.citasApplyForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      usuario: ['', Validators.required],
      tipo: [ `${this.data.tipoProceso}` , Validators.required]
    });
  }

  submitForm() {
    if (this.citasApplyForm.valid) {
      const dataToReturn = new FormData();
      dataToReturn.append('cita_usuario', this.citasApplyForm.value.usuario);
      dataToReturn.append('cita_profesional', this.data.profesional_id);
      dataToReturn.append('cita_fecha', `${this.citasApplyForm.value.fecha} ${this.citasApplyForm.value.hora}`);
      dataToReturn.append('cita_tipo', this.citasApplyForm.value.tipo);

      this.dialogRef.close(dataToReturn);

    } else {
      alert('Por favor revisa la información para continuar');
    }
  }
}
