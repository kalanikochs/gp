/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AcceptDeclineDialogComponent } from 'src/app/shared/components/dialogs/accept-decline-dialog/accept-decline-dialog.component';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { ProfileDialogComponent } from 'src/app/shared/components/dialogs/profile-dialog/profile-dialog.component';
import { NotificationsDialogComponent } from 'src/app/shared/components/dialogs/notifications-dialog/notifications-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { OneSignalService } from 'src/app/services/one-signal.service';

import { Platform, AlertController } from '@ionic/angular';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.scss']
})
export class UsersLayoutComponent implements OnInit, OnDestroy {
  private subscriptions = [];

  userLogin$;
  notifications$;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isHandsetValue: boolean;

  constructor(
    private userLogged: UserloginService,
    private notificationsService: NotificationsService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private httpService: HttpRequestService,
    private title: Title,
    private overlayContainer: OverlayContainer,
    private os: OneSignalService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private _oneSignal: OneSignal
    
    ) {
    this.setTitle();
    this.setMaterialContainer();
    const subscription1 = this.isHandset$.subscribe(value => {
      this.isHandsetValue = value;
    });
    this.subscriptions.push(subscription1);

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }

  setTitle() {
    this.title.setTitle('Gastropack Usuarios');
  }

  setMaterialContainer() {
    this.overlayContainer
      .getContainerElement()
      .classList.add('users-material-container');
  }

  ngOnInit() {
    this.verifyLogin();
    this.os.onInit().then((player_id)=>{
      this.os.savePlayer(player_id);
    });

  }

  verifyLogin() {
    this.userLogged.verifyUserLogged().then(result => {
      if (result) {
        const subscription2 = this.userLogged.userLoggedObs$.subscribe(
          userInfo => {
            this.userLogin$ = userInfo;
          }
        );
        this.subscriptions.push(subscription2);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  setupPush() {
    this._oneSignal.startInit('949d218f-1a5d-4f1b-9dd0-ea8999076061', '883132740611');
    //this._oneSignal.setLogLevel({6,0});
    this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.Notification);
    //this._oneSignal.setSubscription(true);
    this._oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    this._oneSignal.handleNotificationOpened().subscribe(data => {
      let additionalData = data.notification.payload.additionalData;
      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this._oneSignal.endInit();

    /*this._oneSignal.getIds().then(identity => {
      let gsId = sessionStorage.getItem('gsId');
      let player_id = identity.userId;

      alert(player_id);

      let url = `${environment.apiUrl}/common/profile/pushIdRegister`
      const data = new FormData();
      data.append('push_id', player_id);
      data.append('user_id', gsId);
      this.httpService
        .postRequest(url, data)
        .pipe(
          map(response => {
            console.log(response)
          })
        )
        .subscribe(response => {
          console.log(response)
      });
    })*/
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }

  checkNotifications() {
    this.notificationsService.notifications$.subscribe(nv => {
      this.notifications$ = nv;
    });
    this.notificationsService.getNotifications();
  }

  logout() {
    const logoutDialog = this.dialog.open(AcceptDeclineDialogComponent, {
      data: { content: '¿Deseas cerrar tu sesión?' }
    });

    logoutDialog.afterClosed().subscribe(response => {
      if (response) {
        this.userLogged.logout();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }

  openProfile() {
    const profileDialog = this.dialog.open(ProfileDialogComponent, {
      width: this.isHandsetValue ? '90%' : '600px',
      data: this.userLogin$
    });

    profileDialog.afterClosed().subscribe(response => {
      if (response && response.reload) {
        this.userLogged.verifyUserLogged().then();
      }
    });
  }

  openNotifications() {
    const notificationsDialog = this.dialog.open(NotificationsDialogComponent, {
      width: this.isHandsetValue ? '50%' : '600px',
      data: { notifications: this.notifications$ }
    });

    notificationsDialog.afterClosed().subscribe(result => {
      if (result && result.update) {
        const ids = this.notifications$.map(notif => {
          return notif.notificacion_id;
        });

        const idsToSend = JSON.stringify(ids);

        const dataToSend = new FormData();
        dataToSend.append('ids', idsToSend);

        this.httpService
          .postRequest(
            `${environment.apiUrl}/common/notifications/readnotifications/`,
            dataToSend
          )
          .subscribe(response => {
            console.log(response);
            const thisResponse: any = response;
            if (thisResponse.status === 'success') {
              this.checkNotifications();
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
