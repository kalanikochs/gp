import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value-binding',
  templateUrl: './value-binding.component.html',
  styleUrls: ['./value-binding.component.scss']
})
export class ValueBindingComponent implements OnInit {
  valueChanged = 0;

  constructor() {}

  ngOnInit() {}

  subirValue() {
    this.valueChanged++;
  }
}
