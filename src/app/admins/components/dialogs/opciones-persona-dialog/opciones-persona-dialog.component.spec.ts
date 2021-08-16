import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesPersonaDialogComponent } from './opciones-persona-dialog.component';

describe('OpcionesPersonaDialogComponent', () => {
  let component: OpcionesPersonaDialogComponent;
  let fixture: ComponentFixture<OpcionesPersonaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesPersonaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesPersonaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
