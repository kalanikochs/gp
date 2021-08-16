import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRutinasComponent } from './listado-rutinas.component';

describe('ListadoRutinasComponent', () => {
  let component: ListadoRutinasComponent;
  let fixture: ComponentFixture<ListadoRutinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoRutinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
