import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-opciones-cita-dialog',
  templateUrl: './opciones-cita-dialog.component.html',
  styles: []
})
export class OpcionesCitaDialogComponent implements OnInit {
  avilableOption = [];

  constructor(
    public dialogRef: MatDialogRef<OpcionesCitaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.showAvilableOption();
  }

  private showAvilableOption() {
    switch (this.data.cita_estado_id) {
      case '1':
        this.avilableOption = ['anular', 'aprobar','modificarFecha'];
        break;

      case '2':
        this.avilableOption = ['activar'];
        break;

      case '3':
        this.avilableOption = ['anular','modificarFecha'];
        break;

      case '4':
        this.avilableOption = ['anular'];
        break;

      case '5':
        this.avilableOption = [];
        break;

      default:
        break;
    }
  }

  closeOptions(option: string) {
    this.dialogRef.close({ option: `${option}` });
  }
}
