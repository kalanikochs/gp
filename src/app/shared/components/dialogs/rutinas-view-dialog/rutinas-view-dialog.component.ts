import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/core/services/device.service';
import { SwitchAlimentario } from 'src/app/core/interfaces/switchAlimentario.module';

@Component({
  selector: 'app-rutinas-view-dialog',
  templateUrl: './rutinas-view-dialog.component.html',
  styleUrls: ['./rutinas-view-dialog.component.scss']
})
export class RutinasViewDialogComponent implements OnInit {
  private subscriptions = [];
  userLogin$;
  accion = '';

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userLogged: UserloginService,
    public dialogRef: MatDialogRef<RutinasViewDialogComponent>,
    private deviceService: DeviceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  imgExtensions = [];
  ngOnInit() {
    this.imgExtensions = environment.supportedImages;
    this.verifyLogin();
  }

  verifyLogin() {
    this.userLogged.verifyUserLogged().then(result => {
      if (result) {
        const subscription2 = this.userLogged.userLoggedObs$.subscribe(
          userInfo => {
            this.userLogin$ = userInfo;
            this.assignAccion();
          }
        );
        this.subscriptions.push(subscription2);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  private assignAccion() {
    if (this.deviceService.mobile) {
      this.accion = 'oprime';
    } else {
      this.accion = 'da click';
    }
  }

  getVideoIframe(url) {
    let video;
    let results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video
    );
  }

  cerrarConSwitch(switchAlimentario: SwitchAlimentario) {
    const returnClose = {
      opcionSwitchAlimentario: true,
      switchAlimentario: switchAlimentario
    };

    this.dialogRef.close(returnClose);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
