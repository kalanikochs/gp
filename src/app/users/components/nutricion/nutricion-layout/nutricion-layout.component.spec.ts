import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionLayoutComponent } from './nutricion-layout.component';

describe('NutricionLayoutComponent', () => {
  let component: NutricionLayoutComponent;
  let fixture: ComponentFixture<NutricionLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricionLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
