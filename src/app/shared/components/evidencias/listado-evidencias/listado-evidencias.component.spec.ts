import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEvidenciasComponent } from './listado-evidencias.component';

describe('ListadoEvidenciasComponent', () => {
  let component: ListadoEvidenciasComponent;
  let fixture: ComponentFixture<ListadoEvidenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEvidenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
