import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestService } from 'src/app/core/services/test.service';
import { BasicDialogComponent } from 'src/app/shared/components/dialogs/basic-dialog/basic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-service-set',
  templateUrl: './service-set.component.html',
  styleUrls: ['./service-set.component.scss']
})
export class ServiceSetComponent implements OnInit {
  testForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.testForm = this.formBuilder.group({
      testVar: ['', [Validators.required]]
    });
  }

  sendForm() {
    this.testService.setInfoText(this.testForm.value.testVar);

    this.dialog.open(BasicDialogComponent, {
      data: { content: 'Información evniada con exito' }
    });
  }

  deleteSession() {
    this.testService.deleteSession();
    this.dialog.open(BasicDialogComponent, {
      data: { content: 'Session eliminada con exito' }
    });
  }
}
