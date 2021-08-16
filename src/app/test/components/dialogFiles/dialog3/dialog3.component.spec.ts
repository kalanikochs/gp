import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog3Component } from './dialog3.component';

describe('Dialog3Component', () => {
  let component: Dialog3Component;
  let fixture: ComponentFixture<Dialog3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dialog3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dialog3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
