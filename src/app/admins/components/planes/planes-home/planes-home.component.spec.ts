import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesHomeComponent } from './planes-home.component';

describe('PlanesHomeComponent', () => {
  let component: PlanesHomeComponent;
  let fixture: ComponentFixture<PlanesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
