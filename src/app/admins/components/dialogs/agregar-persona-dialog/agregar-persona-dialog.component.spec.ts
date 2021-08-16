import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPersonaDialogComponent } from './agregar-persona-dialog.component';

describe('AgregarPersonaDialogComponent', () => {
  let component: AgregarPersonaDialogComponent;
  let fixture: ComponentFixture<AgregarPersonaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPersonaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPersonaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
