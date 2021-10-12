import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-planes-view-dialog',
  templateUrl: './planes-view-dialog.component.html',
  styleUrls: ['./planes-view-dialog.component.scss']
})
export class PlanesViewDialogComponent implements OnInit {
  imgExtensions = environment.supportedImages;
  $userType = localStorage.getItem('type_id');

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<PlanesViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  }

  getVideoIframe(url) {
    if (url === null) {
      return '';
    }
    const results = url.match('[\\?&]v=([^&#]*)');
    const video = results === null ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video
    );
  }

  getSerializedData(data) {
    const dd = JSON.parse(data);
    if(dd && dd.grupoalimenticio_nombre) {
      return `
      <p><b>Terapia:</b> ${dd.grupoalimenticio_nombre}</p>
      <p><b>Indicaciones:</b> ${dd.alimento}</p>
      <p><b>Observaciones:</b> ${dd.observaciones}</p>
      `;
    } else {
      return '';
    }
  }

  getSerializedDataM(data) {
    const dd = JSON.parse(data);
    if(dd && dd.grupoalimenticio_nombre) {
      return `
      <p><b>Receta:</b> ${dd.grupoalimenticio_nombre}</p>
      <p><b>Indicaciones:</b> ${dd.alimento}</p>
      <p><b>Observaciones:</b> ${dd.observaciones}</p>
      `;
    } else {
      return '';
    }
  }
}
