import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cita } from 'src/app/core/interfaces/cita.module';

@Component({
  selector: 'app-modificar-fecha-cita-dialog',
  templateUrl: './modificar-fecha-cita-dialog.component.html',
  styleUrls: ['./modificar-fecha-cita-dialog.component.scss']
})
export class ModificarFechaCitaDialogComponent implements OnInit {
  private cita: Cita;
  public modificarFechaCitaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModificarFechaCitaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.cita = this.data.cita;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const split = this.cita.cita_fecha.split(' ');
    const fechaCita = split[0];
    const horaCita = split[1];

    this.modificarFechaCitaForm = this.formBuilder.group({
      fecha: [fechaCita, [Validators.required]],
      hora: [horaCita, [Validators.required]]
    });
  }

  submitForm(){
    if (this.modificarFechaCitaForm.valid) {
      const fechaResponse = this.modificarFechaCitaForm.value.fecha + ' ' + this.modificarFechaCitaForm.value.hora;
      const response = {option: 'modificar', fecha: fechaResponse};
      this.dialogRef.close(response);
    }else{
      alert('Por favor revisa la información antes de continuar');
    }
  }
}
