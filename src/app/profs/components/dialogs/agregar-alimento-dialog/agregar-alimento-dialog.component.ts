import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agregar-alimento-dialog',
  templateUrl: './agregar-alimento-dialog.component.html',
  styleUrls: ['./agregar-alimento-dialog.component.scss']
})
export class AgregarAlimentoDialogComponent implements OnInit {
  agregarAlimentoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarAlimentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpRequest: HttpRequestService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.agregarAlimentoForm = this.formBuilder.group({
      grupoalimenticio: [
        {
          value: this.data.grupoalimenticio.grupoalimenticio_nombre,
          disabled: true
        }
      ],
      alimento: ['', [Validators.required]]
    });
  }

  agregarAlimento() {
    if (this.agregarAlimentoForm.valid) {
      const data = new FormData();
      data.append(
        'grupoalimenticio_id',
        this.data.grupoalimenticio.grupoalimenticio_id
      );
      data.append('alimento_nombre', this.agregarAlimentoForm.value.alimento);

      const url = `${environment.apiUrl}/shared/rutinas/agregarAlimento/`;
      
      this.httpRequest.postRequest(url, data).subscribe(result => {
        if (result.status === 'success') {
          alert(result.message);
          this.dialogRef.close({ reload: true });
        } else {
          console.log(result);
        }
      });
    } else {
      alert('Por favor escribe el alimento por agregar');
    }
  }
}
