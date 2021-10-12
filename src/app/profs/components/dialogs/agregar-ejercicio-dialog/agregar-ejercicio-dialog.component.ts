import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agregar-ejercicio-dialog',
  templateUrl: './agregar-ejercicio-dialog.component.html',
  styleUrls: ['./agregar-ejercicio-dialog.component.scss']
})
export class AgregarEjercicioDialogComponent implements OnInit {
  agregarEjercicio: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarEjercicioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpRequest: HttpRequestService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.agregarEjercicio = this.formBuilder.group({
      grupodeportivo: [
        {
          value: this.data.grupodeportivo.grupodeportivo_nombre,
          disabled: true
        }
      ],
      ejercicio: ['', [Validators.required]]
    });
  }

  _agregarEjercicio() {
    if (this.agregarEjercicio.valid) {

      const data = new FormData();
      data.append(
        'grupodeportivo_id',
        this.data.grupodeportivo.grupodeportivo_id
      );
      data.append('ejercicio_nombre', this.agregarEjercicio.value.ejercicio);

      const url = `${environment.apiUrl}/shared/rutinas/agregarRutinaEjercicio/`;

      this.httpRequest.postRequest(url, data).subscribe(result => {
        if (result.status === 'success') {
          alert(result.message);
          this.dialogRef.close({ reload: true });
        } else {
          console.log(result);
        }
      });
    } else {
      alert('Por favor escribe el ejercicio a agregar');
    }
  }
}
