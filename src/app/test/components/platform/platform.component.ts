import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  isMobile: string;

  constructor(deviceService: DeviceService) {
    if (deviceService.mobile) {
      this.isMobile = 'Yo soy mobil';
    } else {
      this.isMobile = 'yo NO soy mobil';
    }
  }

  ngOnInit() {}
}
