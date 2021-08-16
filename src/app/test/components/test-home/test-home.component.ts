import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-home',
  templateUrl: './test-home.component.html',
  styleUrls: ['./test-home.component.scss']
})
export class TestHomeComponent implements OnInit {
  example = true;
  env = environment
  constructor() {
    console.log(this.env);
  }

  ngOnInit() {}

  changeValue() {
    if (this.example) {
      this.example = false;
    } else {
      this.example = true;
    }
  }
}
