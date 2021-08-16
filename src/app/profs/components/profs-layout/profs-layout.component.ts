import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AcceptDeclineDialogComponent } from 'src/app/shared/components/dialogs/accept-decline-dialog/accept-decline-dialog.component';
import { ProfileDialogComponent } from 'src/app/shared/components/dialogs/profile-dialog/profile-dialog.component';
import { NotificationsDialogComponent } from 'src/app/shared/components/dialogs/notifications-dialog/notifications-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profs-layout',
  templateUrl: './profs-layout.component.html',
  styleUrls: ['./profs-layout.component.scss']
})
export class ProfsLayoutComponent implements OnInit, OnDestroy {
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

  tipoCitasPlanes;

  constructor(
    private userLogged: UserloginService,
    private notificationsService: NotificationsService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private httpService: HttpRequestService,
    private title: Title,
    private overlayContainer: OverlayContainer
  ) {
    this.setTitle();
    this.setMaterialContainer();
    const subscription1 = this.isHandset$.subscribe(value => {
      this.isHandsetValue = value;
    });
    this.subscriptions.push(subscription1);
  }

  setTitle() {
    this.title.setTitle('Gastropack Profs');
  }

  setMaterialContainer() {
    this.overlayContainer
      .getContainerElement()
      .classList.add('profs-material-container');
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    await this.verifyLogin();
    // this.checkNotifications();
    this.asignarTipoProf();
  }

  verifyLogin() {
    return new Promise(resolve => {
      this.userLogged.verifyUserLogged().then(result => {
        if (result) {
          const subscription2 = this.userLogged.userLoggedObs$.subscribe(
            userInfo => {
              this.userLogin$ = userInfo;
              resolve(true);
            }
          );

          this.subscriptions.push(subscription2);
        } else {
          this.router.navigate(['/home']);
        }
      });
    });
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
      data: {
        notifications: this.notifications$,
        type: this.userLogged.userType()
      }
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
            const thisResponse: any = response;
            if (thisResponse.status === 'success') {
              this.checkNotifications();
            }
          });
      }
    });
  }

  asignarTipoProf() {
    const type = parseInt(this.userLogin$.type, 0) - 2;
    switch (type.toString()) {
      case '1':
        this.tipoCitasPlanes = 'de Deportes';
        break;

      case '2':
        this.tipoCitasPlanes = 'de Nutrición';
        break;

      case '3':
        this.tipoCitasPlanes = 'de Psicología';
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
