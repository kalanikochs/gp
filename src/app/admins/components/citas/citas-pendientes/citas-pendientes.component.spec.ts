import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPendientesComponent } from './citas-pendientes.component';

describe('CitasPendientesComponent', () => {
  let component: CitasPendientesComponent;
  let fixture: ComponentFixture<CitasPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
