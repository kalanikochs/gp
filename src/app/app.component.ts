import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public constructor(
    private statusBar: StatusBar,
  ) {
  }
}
