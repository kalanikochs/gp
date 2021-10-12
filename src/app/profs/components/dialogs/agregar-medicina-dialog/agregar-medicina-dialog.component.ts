import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agregar-medicina-dialog',
  templateUrl: './agregar-medicina-dialog.component.html',
  styleUrls: ['./agregar-medicina-dialog.component.scss']
})
export class AgregarMedicinaDialogComponent implements OnInit {
  agregarEjercicio: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarMedicinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpRequest: HttpRequestService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.agregarEjercicio = this.formBuilder.group({
      grupomedico: [
        {
          value: this.data.grupomedico.grupomedico_nombre,
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
        'grupomedico_id',
        this.data.grupomedico.grupomedico_id
      );
      data.append('indicacion_nombre', this.agregarEjercicio.value.indicacion);

      const url = `${environment.apiUrl}/shared/rutinas/agregarIndicacionM/`;

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
