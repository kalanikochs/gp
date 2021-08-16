import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesCitaDialogComponent } from './opciones-cita-dialog.component';

describe('OpcionesCitaDialogComponent', () => {
  let component: OpcionesCitaDialogComponent;
  let fixture: ComponentFixture<OpcionesCitaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesCitaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesCitaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
