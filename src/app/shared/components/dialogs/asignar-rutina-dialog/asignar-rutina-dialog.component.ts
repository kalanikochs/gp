import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Plan } from 'src/app/core/interfaces/plan.module';

@Component({
  selector: 'app-solicitar-citas-dialog',
  templateUrl: './asignar-rutina-dialog.component.html',
  styleUrls: ['./asignar-rutina-dialog.component.scss']
})
export class AsignarRutinaDialogComponent implements OnInit {
  asignarRutinaForm: FormGroup;
  links: any[] = [];
  linksForm: FormGroup;
  informacion: object = {};

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AsignarRutinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plan
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.asignarRutinaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      objetivo: ['', [Validators.required]],
      anexos: [undefined]
    });

    this.linksForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      link: ['', [Validators.required]]
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

  asignarRutina() {
    if (this.asignarRutinaForm.valid) {
      const data = new FormData();

      data.append('rutina_nombre', this.asignarRutinaForm.value.nombre);
      data.append(
        'rutina_descripcion',
        this.asignarRutinaForm.value.descripcion
      );
      data.append('rutina_objetivo', this.asignarRutinaForm.value.objetivo);
      data.append(
        'rutina_links',
        this.links.length > 0 ? JSON.stringify(this.links) : ''
      );
      data.append(
        'rutina_informacion',
        Object.keys(this.informacion).length > 0
          ? JSON.stringify(this.informacion)
          : ''
      );

      if (this.asignarRutinaForm.value.anexos) {
        this.asignarRutinaForm.value.anexos._files.forEach(anexo => {
          data.append('anexos[]', anexo);
        });
      }

      this.dialogRef.close(data);
    } else {
      alert('Por favor revisar la información antes de continuar');
    }
  }

  obtenerDieta($event) {
    this.informacion = { dieta: $event };
  }
}
