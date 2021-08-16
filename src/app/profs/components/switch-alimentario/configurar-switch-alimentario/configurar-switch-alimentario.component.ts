import { Component, OnInit } from '@angular/core';
import { GrupoAlimenticio } from 'src/app/core/interfaces/grupoAlimenticio.module';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { FormControl, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from 'src/app/shared/components/dialogs/basic-dialog/basic-dialog.component';
import { AgregarAlimentoDialogComponent } from '../../dialogs/agregar-alimento-dialog/agregar-alimento-dialog.component';
import { DeviceService } from 'src/app/core/services/device.service';
import { ModificarAlimentoDialogComponent } from '../../dialogs/modificar-alimento-dialog/modificar-alimento-dialog.component';

@Component({
  selector: 'app-configurar-switch-alimentario',
  templateUrl: './configurar-switch-alimentario.component.html',
  styleUrls: ['./configurar-switch-alimentario.component.scss']
})
export class ConfigurarSwitchAlimentarioComponent implements OnInit {
  gruposalimenticios: Array<GrupoAlimenticio> = [];
  alimentos: Array<Alimento> = [];
  gruposalimenticiosfc: FormControl;
  alimentosfc: FormControl;
  alimentosToShow: Array<Alimento> = [];

  constructor(
    private httpRequest: HttpRequestService,
    private dialog: MatDialog,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.buildFormControls();
    this.init();
  }

  private buildFormControls() {
    this.gruposalimenticiosfc = new FormControl('', [Validators.required]);
    this.alimentosfc = new FormControl('', [Validators.required]);
  }

  async init() {
    await this.traerGruposAlimenticios();
    await this.traerAlimentos();
  }

  traerGruposAlimenticios() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarGruposAlimenticios/`,
          data
        )
        .pipe(
          map(response => {
            if (response.status === 'success') {
              return response.message as GrupoAlimenticio[];
            } else {
              console.log(response.message);
              return [];
            }
          })
        )
        .subscribe(result => {
          this.gruposalimenticios = result;
          resolve(true);
        });
    });
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

  selecionarAlimentosGrupos(event: string) {
    this.alimentosToShow = this.alimentos.filter(
      alimento => alimento.grupoalimenticio_id === event
    );
  }

  agregarAlimento() {
    if (this.gruposalimenticiosfc.valid) {
      const grupoalimenticioselected = this.gruposalimenticios.find(
        ga => ga.grupoalimenticio_id == this.gruposalimenticiosfc.value
      );

      const crearAlimento = this.dialog.open(AgregarAlimentoDialogComponent, {
        width: this.deviceService.small ? '90%' : '600px',
        data: { grupoalimenticio: grupoalimenticioselected }
      });

      crearAlimento.afterClosed().subscribe(result => {
        if (result.reload) {
          window.location.reload();
        }
      });
    } else {
      this.dialog.open(BasicDialogComponent, {
        data: {
          title: 'Alerta',
          content: 'Debes seleccionar un grupo alimenticio'
        }
      });
    }
  }

  modificarAlimento() {
    if (this.alimentosfc.valid) {
      const alimentoselected = this.alimentos.find(
        al => al.alimento_id == this.alimentosfc.value
      );

      const modificarAlimento = this.dialog.open(
        ModificarAlimentoDialogComponent,
        {
          width: this.deviceService.small ? '90%' : '600px',
          data: { alimento: alimentoselected }
        }
      );

      modificarAlimento.afterClosed().subscribe(result => {
        if (result.reload) {
          window.location.reload();
        }
      });
    } else {
      this.dialog.open(BasicDialogComponent, {
        data: {
          title: 'Alerta',
          content: 'Debes seleccionar un alimento'
        }
      });
    }
  }
}
