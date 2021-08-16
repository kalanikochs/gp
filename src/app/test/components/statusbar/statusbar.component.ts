import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.scss']
})
export class StatusbarComponent implements OnInit {
  constructor(private router: Router, private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#03a9f4');
  }

  ngOnInit() {}

  goHome() {
    console.log('intento funcionar');
    this.router.navigate(['/home']);
  }
}
