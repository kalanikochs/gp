import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionDietaComponent } from './creacion-dieta.component';

describe('CreacionDietaComponent', () => {
  let component: CreacionDietaComponent;
  let fixture: ComponentFixture<CreacionDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
