import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  infoTest = 'Información inicial de ejemplo';

  private obsBeh = new BehaviorSubject<string>('');
  obs$ = this.obsBeh.asObservable();

  constructor(private httpService: HttpRequestService) {
    this.setObs();
  }

  readCookie(name: string) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }

    return false;
  }

  getInfoTest() {
    const actualVar = this.readCookie('infoText');

    if (actualVar) {
      return actualVar;
    } else {
      return 'Informacion inicial';
    }
  }

  setInfoText(newText: string) {
    const newTextencoded = encodeURIComponent(newText);
    document.cookie = 'infoText=' + newTextencoded;
  }

  deleteSession() {
    alert('funciono');
    document.cookie = 'infoText= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    // document.cookie = 'intoText=; max-age=0';
  }

  setObs() {
    this.httpService
      .getRequest('http://localhost/gastropack/api/')
      .subscribe(response => {
        console.log(response);
        this.obsBeh.next(response.message);
      });
  }
}
