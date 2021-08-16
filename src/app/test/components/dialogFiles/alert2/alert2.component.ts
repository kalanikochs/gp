import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert2',
  templateUrl: './alert2.component.html',
  styleUrls: ['./alert2.component.scss']
})
export class Alert2Component implements OnInit {
  ejemplo: any = 'Hola mundo';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data);
  }
}
