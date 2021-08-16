import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-evidencias-view-dialog',
  templateUrl: './evidencias-view-dialog.component.html',
  styleUrls: ['./evidencias-view-dialog.component.scss']
})
export class EvidenciasViewDialogComponent implements OnInit {
  informacion: any;
  evidenciaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EvidenciasViewDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.obtenerInformacion();
    this.buildForm();
  }

  buildForm() {
    this.evidenciaForm = this.formBuilder.group({
      observacion: [
        {
          value: this.informacion ? this.informacion.observacion : '',
          disabled: true
        }
      ]
    });
  }

  obtenerInformacion() {
    if (this.data.evidencia.evidencia_informacion !== '') {
      this.informacion = JSON.parse(this.data.evidencia.evidencia_informacion);
    }
  }
}
