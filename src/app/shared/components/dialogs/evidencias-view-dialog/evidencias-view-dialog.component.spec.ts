import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenciasViewDialogComponent } from './evidencias-view-dialog.component';

describe('EvidenciasViewDialogComponent', () => {
  let component: EvidenciasViewDialogComponent;
  let fixture: ComponentFixture<EvidenciasViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenciasViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenciasViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
