import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resultado-cita-dialog',
  templateUrl: './resultado-cita-dialog.component.html',
  styleUrls: ['./resultado-cita-dialog.component.scss']
})
export class ResultadoCitaDialogComponent implements OnInit {
  resultadoCitaForm: FormGroup;
  pruebasForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ResultadoCitaDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.resultadoCitaForm = this.formBuilder.group({
      resultado: ['', [Validators.required]]
    });

    this.pruebasForm = this.formBuilder.group({
      meldna: [''],
      childpugh: [''],
      nafldscore: ['']
    });
  }

  sendForm() {
    if (this.resultadoCitaForm.valid) {
      const data = new FormData();
      // se agrega el resultado de las pruebas
      const resultado: any = {}
      const resultadoPruebas: any = {};

      // meldna
      if (this.pruebasForm.value.meldna !== '') {
        resultadoPruebas.meldna = this.pruebasForm.value.meldna;
      }

      // childpugh
      if (this.pruebasForm.value.childpugh !== '') {
        resultadoPruebas.childpugh = this.pruebasForm.value.childpugh;
      }

      // nafldscore
      if (this.pruebasForm.value.nafldscore !== '') {
        resultadoPruebas.nafldscore = this.pruebasForm.value.nafldscore;
      }

      // se agrega el atrivuto resultado
      resultado.resultado = this.resultadoCitaForm.value.resultado;


      // se agregan las pruebas
      if (Object.keys(resultadoPruebas).length > 0) {
        resultado.pruebas = resultadoPruebas;
      }

      data.append('cita_resultado', JSON.stringify(resultado));

      this.dialogRef.close(data);
    } else {
      alert('Por favor completa la información antes de continuar');
    }
  }
}
