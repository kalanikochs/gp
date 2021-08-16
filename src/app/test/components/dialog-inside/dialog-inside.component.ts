import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestDialog1Component } from '../../dialogs/test-dialog1/test-dialog1.component';
import { AlertComponent } from '../dialogFiles/alert/alert.component';
import { Dialog3Component } from '../dialogFiles/dialog3/dialog3.component';

@Component({
  selector: 'app-dialog-inside',
  templateUrl: './dialog-inside.component.html',
  styleUrls: ['./dialog-inside.component.scss']
})
export class DialogInsideComponent implements OnInit {
  constructor(private dialog: MatDialog, private overlayContainer: OverlayContainer) {}

  ngOnInit() {
    this.setMaterialContainer();
  }

  setMaterialContainer() {
    this.overlayContainer
    .getContainerElement()
    .classList.add('default-material-container');
  }

  abrirDialogo() {
    const dialog = this.dialog.open(TestDialog1Component);
  }
}
