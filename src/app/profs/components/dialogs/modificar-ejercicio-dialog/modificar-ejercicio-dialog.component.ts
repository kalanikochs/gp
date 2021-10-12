import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modificar-ejercicio-dialog',
  templateUrl: './modificar-ejercicio-dialog.component.html',
  styleUrls: ['./modificar-ejercicio-dialog.component.scss']
})
export class ModificarEjercicioDialogComponent implements OnInit {
  estados = [
    { estado_id: '1', estado_nombre: 'Activo' },
    { estado_id: '2', estado_nombre: 'Inactivo' }
  ];

  modificarAlimentoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModificarEjercicioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpRequest: HttpRequestService
  ) {
    console.log(this.data);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.modificarAlimentoForm = this.formBuilder.group({
      nombre: [ this.data.alimento.alimento_nombre, [Validators.required]
      ],
      estado: [this.data.alimento.alimento_estado_id, [Validators.required]]
    });
  }

  modificarAlimento(){
    if (this.modificarAlimentoForm.valid) {
      const data = new FormData();

      data.append('ejercicio_nombre', this.modificarAlimentoForm.value.nombre);
      data.append('ejercicio_estado', this.modificarAlimentoForm.value.estado);
      data.append('ejercicio_id', this.data.alimento.alimento_id);

      const url = `${environment.apiUrl}/shared/rutinas/modificarEjercicio/`;

      this.httpRequest.postRequest(url, data).subscribe(result => {
        if (result.status === 'success') {
          alert(result.message);
          this.dialogRef.close({ reload: true });
        } else {
          console.log(result);
        }
      });
    } else {
      alert('Por favor revisa la información antes de continuar');
    }
  }
}
