import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesPlanDialogComponent } from './opciones-plan-dialog.component';

describe('OpcionesPlanDialogComponent', () => {
  let component: OpcionesPlanDialogComponent;
  let fixture: ComponentFixture<OpcionesPlanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesPlanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
