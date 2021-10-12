import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Persona } from 'src/app/core/interfaces/persona.module';
import { HttpRequestService } from 'src/app/core/services/http-request.service';
import { environment } from 'src/environments/environment';
import { GrupoAlimenticio } from 'src/app/core/interfaces/grupoAlimenticio.module';
import { Alimento } from 'src/app/core/interfaces/alimento.module';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { GrupoPsicologia } from 'src/app/core/interfaces/grupoPsicologia.module';
import { GrupoMedico } from 'src/app/core/interfaces/grupoMedico.module';

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
  gruposalimenticios: Array<any> = [];
  alimentosToShow: Array<Alimento> = [];
  alimentos: Array<Alimento> = [];
  userLogin$;
  $userType = localStorage.getItem('type_id');
  gruposalimenticiosfc: FormControl;
  alimentosfc: FormControl;
  gruponame: any;
  serialized: any[] | Blob;

  //gruposalimenticios: Array<GrupoMedico> = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AsignarPlanDialogComponent>,
    private httpRequest: HttpRequestService,
    private userLogged: UserloginService
  ) {}

  ngOnInit() {
    this.buildFormControls();
    this.initForm();
    this.traerUsuarios();
    this.init();
  }

  private buildFormControls() {
    this.gruposalimenticiosfc = new FormControl('', [Validators.required]);
    this.alimentosfc = new FormControl('', [Validators.required]);
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
      obs: [undefined],
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
      let url = `${environment.apiUrl}/shared/rutinas/mostrarGruposPsicologia/`;
      if(localStorage.getItem('type_id') == '2') {
        url = `${environment.apiUrl}/shared/rutinas/mostrarGrupoMedico/`;
      }

      this.httpRequest
        .postRequest(
          url,
          data
        )
        .pipe(
          map(response => {
            //if (response.status === 'success') {
              console.log(response)
              if(localStorage.getItem('type_id') == '5') {
              return response.message as GrupoPsicologia[];
              }
              if(localStorage.getItem('type_id') == '2') {
                return response.message as GrupoMedico[];
              }
            /*} else {
              //console.log(response.message);
              return response.message as GrupoAlimenticio[];
            }*/
          })
        )
        .subscribe(result => {
          this.gruposalimenticios = result;
          console.log(this.gruposalimenticios)
          if(!this.gruposalimenticios) {
            this.gruposalimenticios = []
          }
          resolve(true);
        });
    });
  }

  traerAlimentos() {
    return new Promise(resolve => {
      const data = new FormData();

      let url = `${environment.apiUrl}/shared/rutinas/mostrarIndicaciones/`;
      if(localStorage.getItem('type_id') == '2') {
        url = `${environment.apiUrl}/shared/rutinas/mostrarIndicacionesM/`
      }

      this.httpRequest
        .postRequest(
          url,
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

    if(localStorage.getItem('type_id') == '2') {
      this.gruponame = this.gruposalimenticios.filter(
        gp => gp.grupomedico_id == event
      )
    }

    if(localStorage.getItem('type_id') == '5') {
      this.gruponame = this.gruposalimenticios.filter(
        gp => gp.grupopsicologia_id == event
      )
    }

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
      console.log(this.gruponame)
      const data = new FormData();

      let serialized = JSON.stringify({
        grupoalimenticio_id: this.alimentosToShow[0].grupoalimenticio_id,
        grupoalimenticio_nombre: this.gruponame[0].grupopsicologia_nombre,
        alimento: this.alimentosToShow[0].alimento_nombre,
        observaciones: this.asignarPlanForm.value.obs
      });

      if(localStorage.getItem('type_id') == '2') {
        serialized = JSON.stringify({
          grupoalimenticio_id: this.alimentosToShow[0].grupoalimenticio_id,
          grupoalimenticio_nombre: this.gruponame[0].grupomedico_nombre,
          alimento: this.alimentosToShow[0].alimento_nombre,
          observaciones: this.asignarPlanForm.value.obs
        });
      }


      data.append('plan_nombre', this.asignarPlanForm.value.nombre);
      data.append('plan_usuario', this.asignarPlanForm.value.usuario);
      data.append('plan_descripcion', this.asignarPlanForm.value.descripcion);
      data.append('plan_meta', this.asignarPlanForm.value.meta);
      data.append('serialized', serialized)

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
