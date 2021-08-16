import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { Alert2Component } from '../alert2/alert2.component';
import { Dialog3Component } from '../dialog3/dialog3.component';
import { BasicDialogComponent } from 'src/app/shared/components/dialogs/basic-dialog/basic-dialog.component';
import { BasicDialog } from 'src/app/core/interfaces/basicDialog.module';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  nombre: string;
  apellido: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog1() {
    const dialogRef = this.dialog.open(AlertComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog2() {
    this.dialog.open(Alert2Component, {
      data: {
        ejemplo: 'Información de ejemplo'
      }
    });
  }

  openDialog3() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      entrada: 'Este es el texto de entrada'
    };
    dialogConfig.width = '500px';

    const dialog3 = this.dialog.open(Dialog3Component, dialogConfig);

    dialog3.afterClosed().subscribe(result => {
      this.nombre = result.nombre;
      this.apellido = result.apellido;
    });
  }

  openDialog4() {
    const dataToSend: BasicDialog = {
      title: 'titulo de ejemplo',
      content: 'Finalice por hoy'
    };

    this.dialog.open(BasicDialogComponent, {
      data: dataToSend
    });
  }
}
