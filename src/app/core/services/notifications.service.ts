import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationsBS = new BehaviorSubject<any[]>([]);

  notifications$ = this.notificationsBS.asObservable();

  constructor(
    private httpRequest: HttpRequestService,
    private http: HttpClient
  ) {}

  getNotifications() {
    const dataToSend = new FormData();
    dataToSend.append('id', localStorage.getItem('gsId'));

    this.httpRequest
      .postRequest(
        `${environment.apiUrl}/common/notifications/shownotifications/`,
        dataToSend
      )
      .subscribe(result => {
        const thisResult: any = result;

        if (thisResult.status === 'success') {
          this.notificationsBS.next(thisResult.notificaciones);
        } else {
          console.log(thisResult);
        }
      });
  }
}
