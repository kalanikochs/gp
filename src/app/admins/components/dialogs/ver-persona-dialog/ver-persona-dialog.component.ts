import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver-persona-dialog',
  templateUrl: './ver-persona-dialog.component.html',
  styleUrls: ['./ver-persona-dialog.component.scss']
})
export class VerPersonaDialogComponent implements OnInit {
  verPersonaForm: FormGroup;
  tipoPersona = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpRequest: HttpRequestService,
    public dialogRef: MatDialogRef<VerPersonaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.buildForm();
    this.traerTiposPersona();
  }

  buildForm() {
    this.verPersonaForm = this.formBuilder.group({
      nombre: [{ value: this.data.persona.persona_nombres, disabled: true }],
      apellido: [
        { value: this.data.persona.persona_apellidos, disabled: true }
      ],
      direccion: [
        { value: this.data.persona.persona_direccion, disabled: true }
      ],
      telefono: [{ value: this.data.persona.persona_telefono, disabled: true }],
      documento: [
        { value: this.data.persona.persona_documento, disabled: true }
      ],
      tipo: [{ value: this.data.persona.persona_tipo_id, disabled: true }],
      email: [{ value: this.data.persona.persona_email, disabled: true }]
    });
  }

  private traerTiposPersona() {
    return new Promise(resolve => {
      const url = environment.apiUrl + '/Admins/Profs/mostrarTipoPersona';
      const data = new FormData();
      this.httpRequest
        .postRequest(url, data)
        .pipe(map(result => result as MessageRequest))
        .subscribe(response => {
          if (response.status === 'success') {
            this.tipoPersona = response.message;
            resolve(true);
          } else {
            console.log(`${response.status}: ${response.message}`);
          }
        });
    });
  }
}
