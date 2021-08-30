import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  constructor(private httpRequest: HttpRequestService,) { }

  onInit() {
    return new Promise<void>((resolve, reject) => {
      this.onLoad().then((OneSignal) => {
        OneSignal.init({
          appId: "949d218f-1a5d-4f1b-9dd0-ea8999076061",
          httpPermissionRequest: {
            enable: true,
          },
        });
        OneSignal.on('subscriptionChange', function (isSubscribed) {

          OneSignal.push(function () {

            OneSignal.getUserId(function (player_id) {
              console.log('player_id id', player_id);
              resolve(player_id);

            });
          });

        });
      });
    })

  }

  savePlayer(player_id) {
    console.log('push_id', player_id);
    let gsId = sessionStorage.getItem('gsId');

    let url = `${environment.apiUrl}/common/profile/pushIdRegister`
    const data = new FormData();
    data.append('push_id', player_id);
    data.append('user_id', gsId);
    this.httpRequest
      .postRequest(url, data)
      .pipe(
        map(response => {
          console.log(response)
        })
      )
      .subscribe(response => {
        console.log(response)
      });
  }

  async onLoad(): Promise<any> {
    window.OneSignal = window.OneSignal || [];
    return new Promise((resolve) => {
      window.OneSignal.push(function () {
        resolve(window.OneSignal);
      });
    });
  }

  sendNotifications(info) {
    let url = `${environment.apiUrl}/common/notifications/sendNotifications/`;

    let title = (info.title) ? info.title : '';
    let description = (info.description) ? info.description : '';
    let usuario = (info.usuario) ? info.usuario : '';
    let date = (info.date) ? info.date : '';

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('usuario', usuario);
    data.append('date', date);

    if (!usuario) return;

    this.httpRequest
      .postRequest(url, data)
      .pipe(
        map(response => {
          console.log(response)
        })
      )
      .subscribe(response => {
        console.log(response)
      });
  }
}
