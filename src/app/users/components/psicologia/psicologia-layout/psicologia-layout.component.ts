import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { UserloginService } from 'src/app/core/services/userlogin.service';
import { StatusBarService } from 'src/app/core/services/statusBar.service';

@Component({
  selector: 'app-nutricion-layout',
  templateUrl: './psicologia-layout.component.html',
  styleUrls: ['./psicologia-layout.component.scss']
})
export class PsicologiaLayoutComponent implements OnInit, AfterViewInit {
  activeLink = '';
  windowOpen = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private userLogin: UserloginService,
    private statusBarService: StatusBarService
  ) {
    this.statusBarService.setStatusBar();
  }

  ngOnInit() {
    this.userLogin.asignarTipoProceso(3);
  }

  ngAfterViewInit() {
    this.changeWindow();
  }

  changeWindow() {
    setTimeout(() => {
      const url = window.location.href.toString().split('/');
      this.activeLink = url[5];
      console.log(this.activeLink);
    });
  }
}
