import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { map } from 'rxjs/operators';

import { Platform, AlertController } from '@ionic/angular';

import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';


@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  constructor(
    private httpRequest: HttpRequestService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private _oneSignal: OneSignal
  ) { }

  onInit() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        console.log('ready platform');
        this.setupPush();
      });
    }else{
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
  }

  setupPush() {

    this._oneSignal.startInit('949d218f-1a5d-4f1b-9dd0-ea8999076061', '883132740611');

    this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.Notification);

    this._oneSignal.getPermissionSubscriptionState();
    // Notifcation was received in general
    this._oneSignal.handleNotificationReceived().subscribe(notification => {
     /*  let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData); */
      this.receivedNotification(notification);
      console.log('notificacion recibida');
    });

    // Notification was really clicked/opened
    this._oneSignal.handleNotificationOpened().subscribe(async notification => {
      /* let msg = data.notification.payload.body;
      let title = data.notification.payload.title;
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.showAlert(title, msg, additionalData); */
      await this.receivedNotification(notification.notification);
      console.log('notificacion abierta');
    });

    this.getID();

    this._oneSignal.endInit();
  }

  getID(){
    this._oneSignal.getIds().then( info => {
      this.savePlayer(info.userId);
    })
  }

  async receivedNotification(notification: OSNotification) {
    console.log(notification.payload.title)
    this.showAlert(notification.payload.title, notification.payload.body);
  }

  async showAlert(title, msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      buttons: [
        {
          text: msg,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
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

    console.log(usuario)

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
