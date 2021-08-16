import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaLayoutComponent } from './medicina-layout.component';

describe('MedicinaLayoutComponent', () => {
  let component: MedicinaLayoutComponent;
  let fixture: ComponentFixture<MedicinaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
