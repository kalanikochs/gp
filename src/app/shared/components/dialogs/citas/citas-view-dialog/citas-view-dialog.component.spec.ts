import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasViewDialogComponent } from './citas-view-dialog.component';

describe('CitasViewDialogComponent', () => {
  let component: CitasViewDialogComponent;
  let fixture: ComponentFixture<CitasViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
