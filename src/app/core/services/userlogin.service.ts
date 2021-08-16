/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { BehaviorSubject } from 'rxjs';
import { UserLogged } from '../interfaces/userLogged.module';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginModule } from '../interfaces/login.module';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  private userLogged = new BehaviorSubject<UserLogged>({
    id: 0,
    type: 0,
    email: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    documento: 0,
    contrasena: ''
  });

  userLoggedObs$ = this.userLogged.asObservable();

  private tipoProceso = new BehaviorSubject<number>(0);
  tipoProceso$ = this.tipoProceso.asObservable();

  constructor(private httpRequest: HttpRequestService) {}

  verifyUserLogged() {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      // se verifica si existe una session
      // const sessionId = this.readCookie('gsId');
      const sessionId = sessionStorage.getItem('gsId');
      if (sessionId) {
        // traigo la informacion del usuario
        this.getUserInfo(sessionId).then(response => {
          if (response) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        console.log('No existe sesion de usuario');
        resolve(false);
      }
    });
  }

  getUserInfo(id: any) {
    const dataToSend = new FormData();
    dataToSend.append('id', id);
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/common/login/bringuserinfo/`,
          dataToSend
        )
        .subscribe(result => {
          if (result.status === 'success') {
            // se asigna la informacion al observable
            const userLoggedToAsign: UserLogged = {
              id: result.message.persona_id,
              type: result.message.tipo_persona_id,
              email: result.message.persona_email,
              nombres: result.message.persona_nombres,
              apellidos: result.message.persona_apellidos,
              direccion: result.message.persona_direccion,
              telefono: result.message.persona_telefono,
              documento: result.message.persona_documento,
              contrasena: result.message.persona_contrasena
            };
            this.userLogged.next(userLoggedToAsign);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
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

  checkLogin(data) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      const dataToSend = new FormData();

      dataToSend.append('email', data.email);
      dataToSend.append('password', data.password);

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/common/login/checklogin/`,
          dataToSend
        )
        .pipe(map((response: any) => response as LoginModule))
        .subscribe(result => {
          if (result.status === 'success') {
            this.assignSession(result.id);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  assignSession(id) {
    sessionStorage.setItem('gsId', id);
  }

  logout() {
    sessionStorage.clear();
  }

  userType() {
    let response;

    switch (this.userLogged.value.type.toString()) {
      case '1':
        response = 'users';
        break;

      case '2':
      case '3':
      case '4':
      case '5':
        response = 'profs';
        break;

      case '6':
        response = 'admins';
        break;

      default:
        break;
    }

    console.log(response);
    return response;
  }

  asignarTipoProceso(tipo: number) {
    this.tipoProceso.next(tipo);
  }
}
