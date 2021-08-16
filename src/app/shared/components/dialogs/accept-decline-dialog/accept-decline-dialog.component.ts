import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-accept-decline-dialog',
  templateUrl: './accept-decline-dialog.component.html',
  styleUrls: ['./accept-decline-dialog.component.scss']
})
export class AcceptDeclineDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
