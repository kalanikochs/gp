import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionHomeComponent } from './nutricion-home.component';

describe('NutricionHomeComponent', () => {
  let component: NutricionHomeComponent;
  let fixture: ComponentFixture<NutricionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
