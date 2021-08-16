import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesPendientesComponent } from './planes-pendientes.component';

describe('PlanesPendientesComponent', () => {
  let component: PlanesPendientesComponent;
  let fixture: ComponentFixture<PlanesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
