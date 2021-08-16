import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  constructor(
    private deviceService: DeviceService,
    private statusBar: StatusBar
  ) { }

  public setStatusBar() {
    if (this.deviceService.mobile) {
      this.statusBar.overlaysWebView(false);
      this.setStatusBarColor();   
    }
  }

  public setStatusBarColor(){
    //SE configura temporalmente unicamente para el usuario
    this.statusBar.backgroundColorByHexString('#03a9f4');
  }
}
