import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Persona } from 'src/app/core/interfaces/persona.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})

export class MessagesComponent implements OnInit {
  asignarUserForm: FormGroup;
  listadoUsuarios: Persona[];
  tipoProceso: string;
  tiposCitas: any;
  showForm = true;

  private readonly publicKey = 'BNpl7wkG2moxWWiUHwcQSztroXmECyS6dTqkaqAB6hr31FGE3R5_K_DHhowSGo9p2cBRMwAfNrzzZOPiJk23NEg';
  // readonly VAPID_KEY = 'BO7HWId-ubQAgOCopZG4IUlavaO0bYUv8vcjA93AdVNAfS_Eh6yq3Duw8Vi_gaUGBnjyg99BPZ4P39_DROrBL4E'
  constructor(
    private formBuilder: FormBuilder,
    private httpRequest: HttpRequestService,
    private swPush: SwPush,
    // readonly swPush: SwPush)
    //public dialogRef: MatDialogRef<SolicitarCitasDialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.pushSubscription();
    this.swPush.messages.subscribe((message) => console.log(message));
    this.initForm();
    this.init();
  }

  async init() {
    //console.log(this.data.tipoProceso);
    //this.tipoProceso = this.data.tipoProceso;

    await this.traerUsuarios();
    //await this.traerTipoCita();

    //this.showForm = true;
  }

  // subcribeToNotification(){
  //   if(this.swUpdate.isEnabled) {
  //     this.swPush.requestSubscrition({
  //       serverPublickey: this.VAPID_KEY
  //     })
  //     .then(sub => {
  //       this._ws.postSubscription(sub).subscribe();
  //     })
  //   }
  // }

  private traerUsuarios() {
    return new Promise(resolve => {
      const data = new FormData();
      data.append('tipo_id', this.tipoProceso);
      const thisUrl = environment.apiUrl + '/Profs/Users/mostrarUsuarios/';
      this.httpRequest
        .postRequest(thisUrl, data)
        .pipe(
          map(response =>
            response.status === 'success' ? (response.message as Persona[]) : []
          )
        )
        .subscribe(response => {
          this.listadoUsuarios = response;
          resolve(true);
          console.log(response)
        });
    });
  }

  private initForm() {
    this.asignarUserForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      usuario: ['', Validators.required],
      date: ['', Validators.required],
      //tipo: [ `${this.data.tipoProceso}` , Validators.required]
    });
  }

  /*submitForm() {
    if (this.citasApplyForm.valid) {
      const dataToReturn = new FormData();
      dataToReturn.append('cita_usuario', this.citasApplyForm.value.usuario);
      dataToReturn.append('cita_profesional', this.data.profesional_id);
      dataToReturn.append('cita_fecha', `${this.citasApplyForm.value.fecha} ${this.citasApplyForm.value.hora}`);
      dataToReturn.append('cita_tipo', this.citasApplyForm.value.tipo);

      //this.dialogRef.close(dataToReturn);

    } else {
      alert('Por favor revisa la información para continuar');
    }
  }*/

    private async pushSubscription(){
     if(!this.swPush.isEnabled){
      console.log('La notificacion esta habilitada');
      return;
    }
    this.swPush
    .requestSubscription({
      serverPublicKey: this.publicKey,
    })
    .then((sub) => {
      console.log(JSON.stringify(sub));
    })
    .catch((err) => console.log(err));
    }

    // .catch(err => console.error('Could not subscribe to notification', err));



  // private pushSubscription(){
  //   if(!this.swPush.isEnabled){
  //     console.log('La notificacion no esta habilitada');
  //     return;
  //   }
  //   this.swPush.requestSubscription({
  //     serverPublickey: this.publicKey;
  //   })
  //   .then((sub) => {
  //     console.log(JSON.stringify(sub));
  //   })
  //    .catch((err => console.log));

}
