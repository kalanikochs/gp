import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog3',
  templateUrl: './dialog3.component.html',
  styleUrls: ['./dialog3.component.scss']
})
export class Dialog3Component implements OnInit {
  objeto: object = {
    nombre: 'Sebas',
    apellido: 'Joya'
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
