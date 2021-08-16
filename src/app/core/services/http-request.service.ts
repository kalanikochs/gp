import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageRequest } from '../interfaces/messageRequest.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  getRequest(url: string) {
    return this.http.get<any>(url);
  }

  getText(url: string) {
    return this.http.get(url, {
      responseType: 'text'
    });
  }

  postRequest(url: string, data: FormData) {
    return this.http
      .post(url, data)
      .pipe(map((response: any) => response as MessageRequest));
  }

  postText(url: string, data: FormData) {
    return this.http.post(url, data, { responseType: 'text' });
  }

  constructor(private http: HttpClient) {}
}
