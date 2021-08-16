import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  testFileForm: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.testFileForm = this.formBuilder.group({
      basicFile: [undefined, [Validators.required]]
    });
  }

  sendData() {
    if (this.testFileForm.valid) {
      const files = this.testFileForm.value.basicFile._files;
      let validate = true;

      files.forEach(file => {
        const fileName = file.name;
        const fileExtension = file.type.split('/')[0];
        const fileSize = file.size;

        if (fileExtension !== 'image') {
          alert('Todos los archivos deben ser imagenes');
          validate = false;
          return;
        }

        if (fileSize > 6291456) {
          alert('Por favor sube unaa imgen con un tamaño menor');
          validate = false;
          return;
        }
      });

      if (!validate) {
        return;
      }

      // ===========================

      const urlToSend = `${environment.apiUrl}/test/test/uploadFile/`;

      const dataToSend = new FormData();

      console.log(files);

      files.forEach(file => {
        dataToSend.append('basicFile[]', file);
      });

      dataToSend.append('name', 'imagenesEjemplo');

      this.http
        .post(urlToSend, dataToSend, { responseType: 'text' })
        .subscribe(response => {
          console.log(response);
        });
    } else {
      alert('Por favor carga información para continuar');
    }
  }
}
