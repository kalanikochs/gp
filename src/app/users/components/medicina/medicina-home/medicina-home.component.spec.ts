import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaHomeComponent } from './medicina-home.component';

describe('MedicinaHomeComponent', () => {
  let component: MedicinaHomeComponent;
  let fixture: ComponentFixture<MedicinaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
