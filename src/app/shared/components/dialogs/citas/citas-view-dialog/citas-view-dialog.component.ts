import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cita } from 'src/app/core/interfaces/cita.module';

@Component({
  selector: 'app-citas-view-dialog',
  templateUrl: './citas-view-dialog.component.html',
  styleUrls: ['./citas-view-dialog.component.scss']
})
export class CitasViewDialogComponent implements OnInit {
  ejemplo = {
    fecha: '20 de Abril de 2020',
    hora: '10:00',
    doctor: 'Alfonso Ojeda',
    tipo: 'Cita de valoración deportiva',
    estado: 'Realizada',
    resultado:
      // tslint:disable-next-line: max-line-length
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  };

  citasViewForm: FormGroup;
  pruebasForm: FormGroup;
  cita: Cita;
  fecha: string;
  hora: string;
  resultado: string;
  pruebas: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CitasViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.cita = (this.data.cita as unknown) as Cita;
    this.fecha = this.cita.cita_fecha.split(' ')[0];
    this.hora = this.cita.cita_fecha.split(' ')[1];

    // se desestructura el resultado

    if (this.cita.cita_resultado) {
      const rDes = JSON.parse(this.cita.cita_resultado);
      this.resultado = rDes.resultado;

      if (rDes.pruebas) {
        this.pruebas = rDes.pruebas;
      }
    }

    this.buildForm();
  }

  buildForm() {
    this.citasViewForm = this.formBuilder.group({
      fecha: [{ value: this.fecha, disabled: true }],
      hora: [{ value: this.hora, disabled: true }],
      profesional: [
        { value: this.cita.cita_profesional_nombre, disabled: true }
      ],
      usuario: [{ value: this.cita.cita_usuario_nombre, disabled: true }],
      tipo: [{ value: this.cita.cita_tipo_nombre, disabled: true }],
      estado: [{ value: this.cita.cita_estado_nombre, disabled: true }],
      resultado: [{ value: this.resultado || '', disabled: true }]
    });

    this.pruebasForm = this.formBuilder.group({
      meldna: [
        {
          value: this.pruebas ? this.pruebas.meldna : '',
          disabled: true
        }
      ],
      childpugh: [
        {
          value: this.pruebas ? this.pruebas.childpugh : '',
          disabled: true
        }
      ],
      nafldscore: [
        {
          value: this.pruebas ? this.pruebas.nafldscore : '',
          disabled: true
        }
      ]
    });
  }
}
