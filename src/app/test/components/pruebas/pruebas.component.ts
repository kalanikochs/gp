import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {

  constructor(private overlayContainer: OverlayContainer) { }

  ngOnInit() {
    this.setMaterialContainer();
  }

  setMaterialContainer() {
    this.overlayContainer
      .getContainerElement()
      .classList.add('default-material-container');
  }
}
