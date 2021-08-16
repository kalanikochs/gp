import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.scss']
})
export class NotificationsDialogComponent implements OnInit {
  notifications;
  thisClass = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.notifications = data.notifications;
  }

  ngOnInit() {
    this.asignClass();
  }

  private asignClass() {
    this.thisClass = `${this.data.type}-material-container`;
    console.log(this.thisClass);
  }
}
