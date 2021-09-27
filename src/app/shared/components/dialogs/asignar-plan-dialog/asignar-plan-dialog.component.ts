import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Persona } from 'src/app/core/interfaces/persona.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { GrupoAlimenticio } from 'src/app/core/interfaces/grupoAlimenticio.module';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { UserloginService } from 'src/app/core/services/userlogin.service';

@Component({
  selector: 'app-solicitar-citas-dialog',
  templateUrl: './asignar-plan-dialog.component.html',
  styleUrls: ['./asignar-plan-dialog.component.scss']
})
export class AsignarPlanDialogComponent implements OnInit {
  asignarPlanForm: FormGroup;
  links: any[] = [];
  linksForm: FormGroup;
  listadoUsuarios: Persona[];
  grupoalimenticio: Array<GrupoAlimenticio> = [];
  alimentosToShow: Array<Alimento> = [];
  alimentos: Array<Alimento> = [];
  userLogin$;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AsignarPlanDialogComponent>,
    private httpRequest: HttpRequestService,
    private userLogged: UserloginService
  ) {}

  ngOnInit() {
    this.initForm();
    this.traerUsuarios();
    this.init();
  }

  async init() {
    await this.traerGruposAlimenticios();
    await this.traerAlimentos();
    await this.verifyLogin();
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

          //this.subscriptions.push(subscription2);
        }
      });
    });
  }

  initForm() {
    this.asignarPlanForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      meta: ['', [Validators.required]],
      anexos: [undefined]
    });

    this.linksForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });
  }

  private traerUsuarios() {
    return new Promise(resolve => {
      const data = new FormData();
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
        });
    });
  }


  traerGruposAlimenticios() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarGruposDeportivos/`,
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
          this.grupoalimenticio = result;
          resolve(true);
        });
    });
  }

  traerAlimentos() {
    return new Promise(resolve => {
      const data = new FormData();

      this.httpRequest
        .postRequest(
          `${environment.apiUrl}/shared/rutinas/mostrarEjercicios/`,
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
      alimento =>
        alimento.grupoalimenticio_id === event &&
        alimento.alimento_estado_id > '0'
    );

    console.log(this.alimentos)
  }

  agregarLink() {
    if (this.linksForm.valid) {
      const linkToPush = {
        nombre: this.linksForm.value.nombre,
        link: this.linksForm.value.link
      };
      this.links.push(linkToPush);

      this.linksForm.reset();
    } else {
      alert('Por favor verifica los campos del Link antes de continuar');
    }
  }

  borrarLink(index: number) {
    this.links.splice(index, 1);
  }

  asignarPlan() {
    console.log(this.asignarPlanForm.valid)
    if (this.asignarPlanForm.valid) {
      const data = new FormData();

      data.append('plan_nombre', this.asignarPlanForm.value.nombre);
      data.append('plan_usuario', this.asignarPlanForm.value.usuario);
      data.append('plan_descripcion', this.asignarPlanForm.value.descripcion);
      data.append('plan_meta', this.asignarPlanForm.value.meta);
      data.append(
        'plan_links',
        this.links.length > 0 ? JSON.stringify(this.links) : ''
      );

      if (this.asignarPlanForm.value.anexos) {
        this.asignarPlanForm.value.anexos._files.forEach(anexo => {
          data.append('anexos[]', anexo);
        });
      }

      this.dialogRef.close(data);
    } else {
      alert('Por favor revisar la información antes de continuar');
    }
  }
}
