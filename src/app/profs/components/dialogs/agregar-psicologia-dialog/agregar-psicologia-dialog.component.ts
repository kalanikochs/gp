import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agregar-psicologia-dialog',
  templateUrl: './agregar-psicologia-dialog.component.html',
  styleUrls: ['./agregar-psicologia-dialog.component.scss']
})
export class AgregarPsicologiaDialogComponent implements OnInit {
  agregarEjercicio: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarPsicologiaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpRequest: HttpRequestService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.agregarEjercicio = this.formBuilder.group({
      grupopsicologia: [
        {
          value: this.data.grupopsicologia.grupopsicologia_nombre,
          disabled: true
        }
      ],
      indicacion: ['', [Validators.required]]
    });
  }

  _agregarEjercicio() {
    if (this.agregarEjercicio.valid) {

      const data = new FormData();
      data.append(
        'grupopsicologia_id',
        this.data.grupopsicologia.grupopsicologia_id
      );
      data.append('indicacion_nombre', this.agregarEjercicio.value.indicacion);

      const url = `${environment.apiUrl}/shared/rutinas/agregarIndicacion/`;

      this.httpRequest.postRequest(url, data).subscribe(result => {
        if (result.status === 'success') {
          alert(result.message);
          this.dialogRef.close({ reload: true });
        } else {
          console.log(result);
        }
      });
    } else {
      alert('Por favor escribe la indicación a agregar');
    }
  }
}
