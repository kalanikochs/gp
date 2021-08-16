import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-service-get',
  templateUrl: './service-get.component.html',
  styleUrls: ['./service-get.component.scss']
})
export class ServiceGetComponent implements OnInit {
  serviceVariable = '';
  constructor(
    private testService: TestService
  ) {}

  ngOnInit() {
    this.serviceVariable = this.testService.getInfoTest();
  }
}
