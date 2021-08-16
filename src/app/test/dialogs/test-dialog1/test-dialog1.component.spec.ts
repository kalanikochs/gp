import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDialog1Component } from './test-dialog1.component';

describe('TestDialog1Component', () => {
  let component: TestDialog1Component;
  let fixture: ComponentFixture<TestDialog1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDialog1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDialog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
