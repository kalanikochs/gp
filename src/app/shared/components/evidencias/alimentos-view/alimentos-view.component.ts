import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alimentos-view',
  templateUrl: './alimentos-view.component.html',
  styleUrls: ['./alimentos-view.component.scss']
})
export class AlimentosViewComponent implements OnInit {
  alimentos: Array<Alimento> = [];
  alimentosArray = [];
  displayedColumns: string[] = ['alimento'];
  dataSource = new MatTableDataSource();

  @Input() alimentosInput: any;

  constructor(private httpRequest: HttpRequestService) {}

  ngOnInit() {
    this.init();
  }

  // ===========================

  async init() {
    await this.traerAlimentos();
    this.asignarAlimentos();
  }

  traerAlimentos() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarAlimentos/`,
          data
        )
        .pipe(
          map(response => {
            if (response.status === 'success') {
              return response.message as Alimento[];
            } else {
              console.log(response.message);
              return [];
            }
          })
        )
        .subscribe(result => {
          this.alimentos = result;
          resolve(true);
        });
    });
  }

  asignarAlimentos() {
    this.alimentosArray = this.alimentosInput;
    this.dataSource.data = this.alimentosArray;
  }

  // ===========================

  nombreAlimento(alimentoId) {
    return this.alimentos.find(alimento => alimento.alimento_id === alimentoId)
      .alimento_nombre;
  }
}
