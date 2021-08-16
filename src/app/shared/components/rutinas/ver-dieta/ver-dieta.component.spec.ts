import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDietaComponent } from './ver-dieta.component';

describe('VerDietaComponent', () => {
  let component: VerDietaComponent;
  let fixture: ComponentFixture<VerDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
