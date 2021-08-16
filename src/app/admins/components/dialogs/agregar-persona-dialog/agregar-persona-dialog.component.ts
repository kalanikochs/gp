import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { MessageRequest } from 'src/app/core/interfaces/messageRequest.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agregar-persona-dialog',
  templateUrl: './agregar-persona-dialog.component.html',
  styleUrls: ['./agregar-persona-dialog.component.scss']
})
export class AgregarPersonaDialogComponent implements OnInit {
  addPersonaForm: FormGroup;
  tipoPersona = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarPersonaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpRequest: HttpRequestService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.traerTiposPersona();
  }

  buildForm() {
    this.addPersonaForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
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

            if (this.data.persona_tipo === 'profesional') {
              this.tipoPersona.splice(0, 1);
            } else {
              this.tipoPersona.splice(1, 4);
            }

            resolve(true);
          } else {
            console.log(`${response.status}: ${response.message}`);
          }
        });
    });
  }

  agregarPersona() {
    if (this.addPersonaForm.valid) {
      const data = new FormData();
      data.append(
        `${this.data.persona_tipo}_nombres`,
        this.addPersonaForm.value.nombres
      );
      data.append(
        `${this.data.persona_tipo}_apellidos`,
        this.addPersonaForm.value.apellidos
      );
      data.append(
        `${this.data.persona_tipo}_direccion`,
        this.addPersonaForm.value.direccion
      );
      data.append(
        `${this.data.persona_tipo}_telefono`,
        this.addPersonaForm.value.telefono
      );
      data.append(
        `${this.data.persona_tipo}_documento`,
        this.addPersonaForm.value.documento
      );
      data.append(
        `${this.data.persona_tipo}_tipo_id`,
        this.addPersonaForm.value.tipo
      );
      data.append(
        `${this.data.persona_tipo}_email`,
        this.addPersonaForm.value.email
      );
      data.append(
        `${this.data.persona_tipo}_contrasena`,
        this.addPersonaForm.value.contrasena
      );

      this.dialogRef.close(data);
    } else {
      alert('Por favor verifica la información antes de continuar');
    }
  }
}
