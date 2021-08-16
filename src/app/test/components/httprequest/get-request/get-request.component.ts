import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';

@Component({
  selector: 'app-get-request',
  templateUrl: './get-request.component.html',
  styleUrls: ['./get-request.component.scss']
})
export class GetRequestComponent implements OnInit {
  getValue = 'Información inicial';

  constructor(private httpRequestService: HttpRequestService) {}

  ngOnInit() {}

  getRequest() {}
}
