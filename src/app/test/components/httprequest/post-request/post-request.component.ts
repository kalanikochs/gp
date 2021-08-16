import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';

@Component({
  selector: 'app-post-request',
  templateUrl: './post-request.component.html',
  styleUrls: ['./post-request.component.scss']
})
export class PostRequestComponent implements OnInit {
  postValue = 'Información inicial';

  constructor(private httpRequestService: HttpRequestService) {}

  ngOnInit() {}

  postRequest() {
    const infoToSend = new FormData();
    infoToSend.append('hola', 'mundo');

    const urlToSend = `${environment.apiUrl}index/post/`;

    this.httpRequestService
      .postRequest(urlToSend, infoToSend)
      .subscribe(result => {
        console.log(result);
      });
  }
}
