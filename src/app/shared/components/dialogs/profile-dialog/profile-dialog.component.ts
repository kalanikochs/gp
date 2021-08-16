/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit, OnDestroy {
  private subscriptions = [];
  profileForm: FormGroup;
  showError = false;
  showSuccess = false;
  thisClass = '';
  userLogin$;

  constructor(
    private userLogged: UserloginService,
    private formBuilder: FormBuilder,
    private httpRequest: HttpRequestService,
    public dialog: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.buildForm();
    this.subscribeLogin();
  }

  private subscribeLogin() {
    const subscription1 = this.userLogged.userLoggedObs$.subscribe(userInfo => {
      this.userLogin$ = userInfo;
    });

    this.subscriptions.push(subscription1);
  }

  private buildForm() {
    this.profileForm = this.formBuilder.group({
      nombres: [this.data.nombres, [Validators.required]],
      apellidos: [this.data.apellidos, [Validators.required]],
      direccion: [this.data.direccion, [Validators.required]],
      telefono: [this.data.telefono, [Validators.required]],
      documento: [this.data.documento, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      contrasena: [this.data.contrasena, [Validators.required]]
    });
  }

  sendChanges() {
    if (this.profileForm.valid) {
      const dataToSend = new FormData();
      dataToSend.append('persona_id', this.data.id ? this.data.id : this.userLogin$.id);
      dataToSend.append('persona_nombres', this.profileForm.value.nombres);
      dataToSend.append('persona_apellidos', this.profileForm.value.apellidos);
      dataToSend.append('persona_direccion', this.profileForm.value.direccion);
      dataToSend.append('persona_telefono', this.profileForm.value.telefono);
      dataToSend.append('persona_documento', this.profileForm.value.documento);
      dataToSend.append('persona_email', this.profileForm.value.email);
      dataToSend.append(
        'persona_contrasena',
        this.profileForm.value.contrasena
      );

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/common/profile/changedata/`,
          dataToSend
        )
        .subscribe(response => {
          const thisResponse: any = response;
          if (thisResponse.status === 'success') {
            this.showSuccess = true;
            setTimeout(() => {
              this.dialog.close({ reload: true });
            }, 1000);
          }
        });
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 2500);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
