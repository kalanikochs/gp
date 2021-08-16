import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesViewDialogComponent } from './planes-view-dialog.component';

describe('PlanesViewDialogComponent', () => {
  let component: PlanesViewDialogComponent;
  let fixture: ComponentFixture<PlanesViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
