import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDeclineDialogComponent } from './accept-decline-dialog.component';

describe('AcceptDeclineDialogComponent', () => {
  let component: AcceptDeclineDialogComponent;
  let fixture: ComponentFixture<AcceptDeclineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptDeclineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptDeclineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
