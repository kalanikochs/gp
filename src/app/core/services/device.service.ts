import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  mobile: boolean;
  small: boolean;

  constructor(private platform: Platform) {
    this.mobile =
      this.platform.is('cordova') ? true : false;

    this.small = this.platform.width() <= 450 ? true : false;
  }
}
