import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Persona } from 'src/app/core/interfaces/persona.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitar-citas-dialog',
  templateUrl: './asignar-plan-dialog.component.html',
  styleUrls: ['./asignar-plan-dialog.component.scss']
})
export class AsignarPlanDialogComponent implements OnInit {
  asignarPlanForm: FormGroup;
  links: any[] = [];
  linksForm: FormGroup;
  listadoUsuarios: Persona[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AsignarPlanDialogComponent>,
    private httpRequest: HttpRequestService
  ) {}

  ngOnInit() {
    this.initForm();
    this.traerUsuarios();
  }

  initForm() {
    this.asignarPlanForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      meta: ['', [Validators.required]],
      anexos: [undefined]
    });

    this.linksForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });
  }

  private traerUsuarios() {
    return new Promise(resolve => {
      const data = new FormData();
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

  agregarLink() {
    if (this.linksForm.valid) {
      const linkToPush = {
        nombre: this.linksForm.value.nombre,
        link: this.linksForm.value.link
      };
      this.links.push(linkToPush);

      this.linksForm.reset();
    } else {
      alert('Por favor verifica los campos del Link antes de continuar');
    }
  }

  borrarLink(index: number) {
    this.links.splice(index, 1);
  }

  asignarPlan() {
    if (this.asignarPlanForm.valid) {
      const data = new FormData();

      data.append('plan_nombre', this.asignarPlanForm.value.nombre);
      data.append('plan_usuario', this.asignarPlanForm.value.usuario);
      data.append('plan_descripcion', this.asignarPlanForm.value.descripcion);
      data.append('plan_meta', this.asignarPlanForm.value.meta);
      data.append(
        'plan_links',
        this.links.length > 0 ? JSON.stringify(this.links) : ''
      );

      if (this.asignarPlanForm.value.anexos) {
        this.asignarPlanForm.value.anexos._files.forEach(anexo => {
          data.append('anexos[]', anexo);
        });
      }

      this.dialogRef.close(data);
    } else {
      alert('Por favor revisar la información antes de continuar');
    }
  }
}
