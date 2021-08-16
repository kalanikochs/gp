import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasOptionsDialogComponent } from './citas-options-dialog.component';

describe('CitasOptionsDialogComponent', () => {
  let component: CitasOptionsDialogComponent;
  let fixture: ComponentFixture<CitasOptionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasOptionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
