import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRutinaDialogComponent } from './asignar-rutina-dialog.component';

describe('AsignarRutinaDialogComponent', () => {
  let component: AsignarRutinaDialogComponent;
  let fixture: ComponentFixture<AsignarRutinaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarRutinaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRutinaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
