import { Component, OnInit } from '@angular/core';
import { UserloginService } from 'src/app/core/services/userlogin.service';

@Component({
  selector: 'app-psicologia-home',
  templateUrl: './psicologia-home.component.html',
  styleUrls: ['./psicologia-home.component.scss']
})
export class PsicologiaHomeComponent implements OnInit {
  constructor(private userLogin: UserloginService) {}

  ngOnInit() {
    this.userLogin.asignarTipoProceso(3);
  }
}
