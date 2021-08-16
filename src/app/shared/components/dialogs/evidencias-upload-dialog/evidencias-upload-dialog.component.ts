import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImgCompliant } from 'src/app/utils/imgCompliant';

@Component({
  selector: 'app-evidencias-upload-dialog',
  templateUrl: './evidencias-upload-dialog.component.html',
  styleUrls: ['./evidencias-upload-dialog.component.scss']
})
export class EvidenciasUploadDialogComponent implements OnInit {
  nuevaEvidenciaForm: FormGroup;
  informacion: any = {};
  alimentos: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EvidenciasUploadDialogComponent>
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.nuevaEvidenciaForm = this.formBuilder.group({
      anexos: [undefined, [Validators.required, ImgCompliant.isImgCompliant]],
      observacion: ['', [Validators.required]]
    });
  }

  enviarEvidencia() {
    if (this.nuevaEvidenciaForm.valid) {
      const files = this.nuevaEvidenciaForm.value.anexos._files;
      const data = new FormData();

      files.forEach(file => {
        data.append('anexos[]', file);
      });

      // agregar la observacion

      this.informacion.observacion = this.nuevaEvidenciaForm.value.observacion;

      // agregar el listado de alimentos

      if (this.alimentos.length > 0) {
        this.informacion.alimentos = this.alimentos;
      }

      // anexar la informacion

      data.append('evidencia_informacion', JSON.stringify(this.informacion));

      this.dialogRef.close(data);
    }
  }

  asignarAlimentos($event) {
    this.alimentos = $event;
  }
}
