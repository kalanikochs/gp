import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoCitaDialogComponent } from './resultado-cita-dialog.component';

describe('ResultadoCitaDialogComponent', () => {
  let component: ResultadoCitaDialogComponent;
  let fixture: ComponentFixture<ResultadoCitaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoCitaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoCitaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
