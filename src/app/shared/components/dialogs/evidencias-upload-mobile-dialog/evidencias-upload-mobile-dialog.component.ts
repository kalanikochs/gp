/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImgCompliant } from 'src/app/utils/imgCompliant';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-evidencias-upload-mobile-dialog',
  templateUrl: './evidencias-upload-mobile-dialog.component.html',
  styleUrls: ['./evidencias-upload-mobile-dialog.component.scss']
})
export class EvidenciasUploadMobileDialogComponent implements OnInit {
  nuevaEvidenciaForm: FormGroup;
  informacion: any = {};
  alimentos: Array<any> = [];
  imagenes: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EvidenciasUploadMobileDialogComponent>,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.nuevaEvidenciaForm = this.formBuilder.group({
      observacion: ['', [Validators.required]]
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        const base64Image = imageData;
        this.imagenes.push(base64Image);
      },
      err => {
        alert('Por favor intenta tomar la fotografia de nuevo');
      }
    );
  }

  borrarFotos() {
    this.imagenes = [];
  }

  enviarEvidencia() {
    if (this.nuevaEvidenciaForm.valid) {
      if (this.imagenes.length < 1) {
        alert('Por favor agrega evidencias fotograficas para continuar');
      } else {
        const data = new FormData();

        this.imagenes.forEach(imagen => {
          data.append('anexos[]', imagen);
        });

        // agregar la observacion

        this.informacion.observacion = this.nuevaEvidenciaForm.value.observacion;

        // agregar el listado de alimentos

        if (this.alimentos.length > 0) {
          this.informacion.alimentos = this.alimentos;
        }

        // anexar la informacion

        data.append('evidencia_informacion', JSON.stringify(this.informacion));

        this.dialogRef.close(data);
      }
    } else {
      console.log('Formulario no valido, por favor revisar');
    }
  }

  asignarAlimentos($event) {
    this.alimentos = $event;
  }
}
