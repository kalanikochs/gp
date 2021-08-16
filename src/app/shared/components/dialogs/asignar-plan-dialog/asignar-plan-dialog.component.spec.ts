import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPlanDialogComponent } from './asignar-plan-dialog.component';

describe('AsignarPlanDialogComponent', () => {
  let component: AsignarPlanDialogComponent;
  let fixture: ComponentFixture<AsignarPlanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarPlanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
