import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-opciones-plan-dialog',
  templateUrl: './opciones-plan-dialog.component.html',
  styles: []
})
export class OpcionesPlanDialogComponent implements OnInit {
  avilableOption = [];
  constructor(
    public dialogRef: MatDialogRef<OpcionesPlanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.showAvilableOption();
  }

  private showAvilableOption() {
    switch (this.data.plan_estado_id) {
      case '1':
        this.avilableOption = ['anular','finalizar'];
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
