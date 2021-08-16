import { Component, OnInit } from '@angular/core';
import { StatusBarService } from 'src/app/core/services/statusBar.service';
import { UserloginService } from 'src/app/core/services/userlogin.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

  userLogin$;

  constructor(
    private userLogged: UserloginService,
    private statusBarService: StatusBarService)
  {
    this.statusBarService.setStatusBar();
  }

  ngOnInit() {
  }

}
