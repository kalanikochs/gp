import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-opciones-persona-dialog',
  templateUrl: './opciones-persona-dialog.component.html',
  styleUrls: ['./opciones-persona-dialog.component.scss']
})
export class OpcionesPersonaDialogComponent implements OnInit {
  avilableOption = [];
  permitirEliminar = false;
  constructor(
    public dialogRef: MatDialogRef<OpcionesPersonaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.showAvilableOption();
  }

  private showAvilableOption() {
    switch (this.data.persona_estado_id) {
      case '1':
        this.avilableOption = ['anular'];
        break;

      case '2':
        this.avilableOption = ['activar'];
        break;

      default:
        break;
    }
  }

  closeOptions(option: string) {
    this.dialogRef.close({ option: `${option}` });
  }
}
