import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinasViewDialogComponent } from './rutinas-view-dialog.component';

describe('RutinasViewDialogComponent', () => {
  let component: RutinasViewDialogComponent;
  let fixture: ComponentFixture<RutinasViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinasViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinasViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
